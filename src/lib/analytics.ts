/**
 * Camada única de analytics da landing.
 * Dispara eventos de conversão para o Meta Pixel (fbq) e o Google Analytics 4 (gtag),
 * sempre de forma segura (no-op se o script ainda não carregou / for bloqueado).
 *
 * Os scripts base (gtag.js, fbq, Clarity) são injetados no index.html.
 * Aqui ficam só os eventos de CONVERSÃO (clique em CTA, envio de formulário).
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

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

/** "Agendar Demo/Demonstração" (Calendly) — agendamento. */
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
}

/** Abertura do tour/demo interativo ("Ver como funciona"). */
export function trackViewDemo(source: string) {
  fbqTrack("ViewContent", { content_name: "Tour interativo", source });
  gaEvent("view_demo", { source });
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
