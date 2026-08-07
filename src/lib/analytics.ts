/**
 * Camada única de analytics da landing.
 * Dispara eventos de conversão para o Meta Pixel (fbq), o Google Analytics 4 (gtag)
 * e o OpenAI Ads (oaiq), sempre de forma segura (no-op se o script ainda não
 * carregou / for bloqueado).
 *
 * Os scripts base (gtag.js, fbq, oaiq, Clarity) são injetados no index.html.
 * Aqui ficam só os eventos de CONVERSÃO (clique em CTA, envio de formulário).
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    oaiq?: (...args: unknown[]) => void;
  }
}

/** Moeda das conversões — operação 100% Brasil. */
const CURRENCY = "BRL";

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
 * Dispara uma conversão do OpenAI Ads.
 * `type: "customer_action"` é o tipo padrão dos eventos de conversão do oaiq.
 */
function oaiqMeasure(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.oaiq === "function") {
    window.oaiq("measure", event, { type: "customer_action", ...params });
  }
}

/** "Agendar Demo/Demonstração" (Calendly) — agendamento. */
export function trackScheduleDemo(source: string) {
  fbqTrack("Schedule", { content_name: "Agendar Demo", source });
  fbqTrack("Lead", { content_name: "Agendar Demo", source });
  gaEvent("schedule_demo", { method: "calendly", source });
  gaEvent("generate_lead", { method: "calendly", source });
  oaiqMeasure("appointment_scheduled");
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
  oaiqMeasure("registration_completed", { amount: 0, currency: CURRENCY });
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
  oaiqMeasure("registration_completed", { amount: 0, currency: CURRENCY });
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
        trackScheduleDemo(label || "cta_calendly");
      } else if (/wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(href)) {
        trackContactWhatsApp(label || "cta_whatsapp");
      }
    },
    true, // fase de captura: pega antes de qualquer stopPropagation
  );
}
