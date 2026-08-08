/**
 * Camada única de analytics da landing.
 * Dispara eventos de conversão para o Meta Pixel (fbq) e o Google Analytics 4
 * (gtag), sempre de forma segura (no-op se o script ainda não carregou / for
 * bloqueado), e para o OpenAI Ads pela Conversions API server-side.
 *
 * Os scripts base (gtag.js, fbq, oaiq, Clarity) são injetados no index.html.
 * Aqui ficam só os eventos de CONVERSÃO (clique em CTA, envio de formulário).
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Endpoint first-party da ponte de conversões (server/capi-bridge). */
const CAPI_REGISTRATION = "/capi/registration";

const pageUrl = () => (typeof location === "undefined" ? "" : location.href);

/** Dispara um evento padrão do Meta Pixel. */
function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

/** Dispara um evento do GA4. */
function gaEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

/**
 * Conversões do OpenAI Ads vão pela Conversions API (server-side), não pelo
 * pixel. Dois motivos, os dois medidos em 07/08/2026:
 *
 *  - a ingestão do pixel no navegador estava devolvendo 503 enquanto a API
 *    server-side respondia 200;
 *  - o pixel é bloqueável por adblock, e o endpoint é first-party.
 *
 * Não mandamos pelos dois caminhos de propósito: a dedupe exigiria que o
 * `event_id` do pixel casasse com o `id` da API, e o nome desse campo no SDK
 * do navegador não está documentado. Errar isso contaria a mesma conversão
 * duas vezes e estragaria a otimização da campanha.
 */
function sendServerConversion(path: string, body: Record<string, unknown>) {
  if (typeof fetch !== "function") return;
  fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Manda o cookie __oppref (first-party), que é como o servidor liga a
    // conversão ao clique no anúncio.
    credentials: "include",
    // Sobrevive à navegação: o usuário pode sair da página logo em seguida.
    keepalive: true,
    body: JSON.stringify(body),
  }).catch(() => {
    /* conversão é telemetria: nunca pode quebrar o fluxo do usuário */
  });
}

/** Lê o cookie de clique de anúncio que o SDK do OpenAI grava. */
function readOppref(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("__oppref="));
  return match ? decodeURIComponent(match.slice("__oppref=".length)) : "";
}

/**
 * "Agendar Demo/Demonstração" (Calendly) — agendamento.
 *
 * Aqui NÃO sai appointment_scheduled: este evento é o CLIQUE, e quem clica
 * pode não reservar. A conversão de verdade sai da ponte server-side, que lê
 * a reserva confirmada no Calendly.
 */
export function trackScheduleDemo(source: string) {
  fbqTrack("Schedule", { content_name: "Agendar Demo", source });
  fbqTrack("Lead", { content_name: "Agendar Demo", source });
  gaEvent("schedule_demo", { method: "calendly", source });
  gaEvent("generate_lead", { method: "calendly", source });
}

/** "Fale Conosco" (WhatsApp). */
export function trackContactWhatsApp(source: string) {
  fbqTrack("Contact", { method: "whatsapp", source });
  gaEvent("contact", { method: "whatsapp", source });
}

/** Envio do formulário de contato (página /contato). */
export function trackContactForm(source = "contact_page") {
  fbqTrack("Lead", { content_name: "Formulario de contato", source });
  gaEvent("generate_lead", { method: "form", source });
  sendServerConversion(CAPI_REGISTRATION, { source_url: pageUrl() });
}

/** Abertura do tour/demo interativo ("Ver como funciona"). */
export function trackViewDemo(source: string) {
  fbqTrack("ViewContent", { content_name: "Tour interativo", source });
  gaEvent("view_demo", { source });
}

/**
 * Abertura do formulário de leads (clique no CTA "Fale Conosco" / "Tenho interesse").
 * Mantém o sinal de topo de funil que o antigo link de WhatsApp emitia ao ser clicado.
 */
export function trackLeadFormOpen(source: string, plan?: string) {
  fbqTrack("Contact", { method: "lead_form", source, plan });
  gaEvent("lead_form_open", { source, plan });
}

/** Envio do formulário de leads (planos / "Fale Conosco" do header). */
export function trackLeadForm(source: string, plan?: string) {
  fbqTrack("Lead", { content_name: plan ?? "Formulario de leads", source });
  gaEvent("generate_lead", { method: "lead_form", source, plan });
  sendServerConversion(CAPI_REGISTRATION, { source_url: pageUrl() });
}

/**
 * Carimba o identificador de clique de anúncio no link do Calendly.
 *
 * O agendamento acontece FORA do nosso site, então a reserva só é atribuível ao
 * anúncio se o identificador viajar junto. O Calendly devolve na API os campos
 * de rastreio que vieram na URL — usamos `salesforce_uuid`, que é campo livre de
 * passagem, para não sujar os UTMs de verdade do relatório de vocês.
 *
 * Roda na fase de captura, antes da navegação, então o href já sai carimbado.
 */
function stampOpprefOnCalendlyLink(anchor: HTMLAnchorElement) {
  const oppref = readOppref();
  if (!oppref) return;
  try {
    const url = new URL(anchor.href);
    if (url.searchParams.has("salesforce_uuid")) return;
    url.searchParams.set("salesforce_uuid", oppref);
    anchor.href = url.toString();
  } catch {
    /* href malformado: melhor perder a atribuição do que quebrar o link */
  }
}

/**
 * Listener delegado: captura TODOS os links de conversão (Calendly e WhatsApp),
 * incluindo CTAs futuros, sem precisar instrumentar cada botão.
 * Como os links abrem em nova aba (target=_blank), a página não descarrega
 * e o evento dispara normalmente antes/durante a navegação.
 */
export function initAutoTracking() {
  if (typeof document === "undefined") return;

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const label = (anchor.textContent || "").trim().slice(0, 60);

      if (/calendly\.com/i.test(href)) {
        stampOpprefOnCalendlyLink(anchor);
        trackScheduleDemo(label || "cta_calendly");
      } else if (/wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(href)) {
        trackContactWhatsApp(label || "cta_whatsapp");
      }
    },
    true, // fase de captura: pega antes de qualquer stopPropagation
  );
}
