import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Chrome,
  Globe,
  Puzzle,
  MessageSquare,
  Building2,
  Sparkles,
  Search,
  UserPlus,
  Send,
} from "lucide-react";

// lucide não tem glifos de marca para Edge/Firefox/Safari — usamos um ícone
// neutro para esses e o de Chrome só onde ele realmente representa o navegador.
const browsers = [
  { name: "Chrome", icon: Chrome },
  { name: "Edge", icon: Globe },
  { name: "Firefox", icon: Globe },
  { name: "Safari", icon: Globe },
];

const features = [
  {
    icon: UserPlus,
    title: "Lead direto da conversa",
    description:
      "Identifica o contato no WhatsApp Web e cria ou sincroniza o lead no imobHUB com um clique — já na fase certa do funil.",
  },
  {
    icon: Search,
    title: "Estoque na ponta dos dedos",
    description:
      "Busca inteligente no seu estoque sem sair da conversa. Encontre o imóvel ideal por bairro, preço ou tipo e envie o PDF na hora.",
  },
  {
    icon: MessageSquare,
    title: "Respostas prontas e editáveis",
    description:
      "Sugestões de resposta com os dados do imóvel já preenchidos. Edite e envie sem copiar e colar.",
  },
  {
    icon: Building2,
    title: "Match de demandas",
    description:
      "Transforma o pedido do cliente em uma demanda e cruza automaticamente com os imóveis disponíveis no seu estoque.",
  },
];

export function Extension() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="extensao" className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full">
            <Puzzle className="w-4 h-4" />
            Extensão de Navegador
          </span>
          <h2 className="heading-section mb-6">
            O imobHUB dentro do
            <br />
            <span className="text-gradient">seu WhatsApp Web.</span>
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Nosso Copiloto vive ao lado da conversa: cria leads, busca imóveis no
            seu estoque e sugere respostas — sem você trocar de aba.
          </p>

          {/* Browser badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {browsers.map((b) => (
              <span
                key={b.name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
              >
                <b.icon className="w-4 h-4 text-accent" />
                {b.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mockup + features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <BrowserMockup />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 space-y-6"
          >
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Mockup visual da extensão sobre o WhatsApp Web (puro CSS, sem imagens). */
function BrowserMockup() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
      {/* Barra do navegador */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 max-w-[220px] rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground truncate">
          web.whatsapp.com
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent">
          <Puzzle className="w-3 h-3" />
          Copiloto
        </span>
      </div>

      {/* Corpo: conversa + painel do copiloto */}
      <div className="grid grid-cols-5 min-h-[340px]">
        {/* Conversa (WhatsApp) */}
        <div className="col-span-2 bg-[#0b141a] p-3 hidden sm:flex flex-col gap-2">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-emerald-500/30" />
            <div className="flex-1">
              <div className="h-2 w-20 rounded bg-white/30" />
              <div className="mt-1 h-1.5 w-12 rounded bg-white/15" />
            </div>
          </div>
          <div className="self-start max-w-[80%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2">
            <div className="h-1.5 w-24 rounded bg-white/30" />
            <div className="mt-1 h-1.5 w-16 rounded bg-white/20" />
          </div>
          <div className="self-end max-w-[80%] rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2">
            <div className="h-1.5 w-20 rounded bg-white/40" />
          </div>
          <div className="self-start max-w-[80%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2">
            <div className="h-1.5 w-28 rounded bg-white/30" />
          </div>
        </div>

        {/* Painel do Copiloto imobHUB */}
        <div className="col-span-5 sm:col-span-3 bg-background p-4 flex flex-col gap-3">
          {/* Lead identificado */}
          <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                MR
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight">Marina Rocha</p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Lead • Em atendimento
                </p>
              </div>
            </div>
            <button className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-[10px] font-semibold text-white">
              <UserPlus className="w-3 h-3" />
              Sincronizar
            </button>
          </div>

          {/* Busca no estoque */}
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">
              2 quartos, Setor Bueno, até R$ 600 mil
            </span>
          </div>

          {/* Cards de imóvel */}
          <div className="space-y-2">
            {[
              { code: "AP-1042", title: "Apto 2Q · Setor Bueno", price: "R$ 540.000" },
              { code: "AP-0987", title: "Apto 2Q · Setor Oeste", price: "R$ 585.000" },
            ].map((unit) => (
              <div
                key={unit.code}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
              >
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-accent/30 to-emerald-400/20 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold truncate">{unit.title}</p>
                  <p className="text-[10px] text-muted-foreground">{unit.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-accent">{unit.price}</p>
                  <button className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                    <Send className="w-2.5 h-2.5" />
                    Enviar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resposta sugerida */}
          <div className="mt-auto rounded-lg border border-accent/30 bg-accent/5 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wide">
                Resposta sugerida
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">
              "Oi, Marina! Separei 2 opções de 2 quartos no Setor Bueno dentro do
              seu orçamento. Quer que eu envie os detalhes? 🏡"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
