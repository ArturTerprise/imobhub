import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Sparkles,
  ClipboardPaste,
  PenLine,
  UserSearch,
  Combine,
  ShieldCheck,
  Wallet,
  ArrowRight,
  MessageCircle,
  Check,
  CornerDownRight,
  AudioLines,
  ListChecks,
  CalendarClock,
  RefreshCw,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY_LINK = "https://calendly.com/artur-terprise/30min";

const mono = "font-['IBM_Plex_Mono']";
const display = "font-['Bricolage_Grotesque']";

// ——— O loop: como um único áudio mantém o sistema vivo ———
const loop = [
  {
    icon: AudioLines,
    n: "01",
    title: "Áudio no WhatsApp",
    desc: "“Visitei o cliente, gostou do apto. Agenda retorno pra quinta e anota que ele quer 3 vagas.”",
  },
  {
    icon: ListChecks,
    n: "02",
    title: "Nota + tarefa criadas",
    desc: "O agente transcreve, registra a nota no lead e abre a tarefa já com a data certa.",
  },
  {
    icon: CalendarClock,
    n: "03",
    title: "Cai no Google Calendar",
    desc: "A tarefa sincroniza na agenda do corretor automaticamente — zero digitação.",
  },
  {
    icon: RefreshCw,
    n: "04",
    title: "Lead sempre atualizado",
    desc: "Histórico, etapa e próximos passos em dia sem ninguém abrir o sistema.",
  },
  {
    icon: BrainCircuit,
    n: "05",
    title: "A IA fica mais afiada",
    desc: "Cada interação enriquece a análise que sugere as próximas ações.",
  },
];

// Posições dos nós sobre o traçado serpenteado (viewBox 1000 × 340).
const NODES = [
  { x: 110, y: 110 },
  { x: 305, y: 238 },
  { x: 500, y: 110 },
  { x: 695, y: 238 },
  { x: 890, y: 118 },
];
const LOOP_PATH =
  "M 110 110 C 200 110, 215 238, 305 238 C 395 238, 410 110, 500 110 C 590 110, 605 238, 695 238 C 785 238, 805 118, 890 118";

// ——— Mockups de cada função (janela do produto) ———

function MockAutofill() {
  const fields = [
    ["TIPO", "Apartamento"],
    ["QUARTOS", "3"],
    ["SUÍTES", "1"],
    ["ÁREA", "87 m²"],
    ["BAIRRO", "Setor Bueno"],
    ["VALOR", "R$ 650.000"],
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-slate-100 border border-slate-200 p-3 text-[11px] leading-relaxed text-slate-500">
        “Apartamento de 3 quartos sendo 1 suíte, 87m² no Setor Bueno. Andar
        alto, 2 vagas. Aceita financiamento. R$ 650 mil.”
        <span className={`${mono} ml-1 text-[10px] text-slate-400`}>// colado de outro anúncio</span>
      </div>
      <div className={`${mono} flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-violet-600`}>
        <CornerDownRight className="w-3.5 h-3.5" />
        Campos extraídos pela IA
      </div>
      <div className="grid grid-cols-2 gap-2">
        {fields.map(([label, value], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="flex items-center justify-between rounded-md border border-violet-200 bg-violet-50/60 px-2.5 py-1.5"
          >
            <div className="min-w-0">
              <p className={`${mono} text-[9px] tracking-wide text-slate-400`}>{label}</p>
              <p className="text-xs font-semibold text-slate-800 truncate">{value}</p>
            </div>
            <Check className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MockDescricao() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className={`${mono} text-[10px] tracking-wide text-slate-400`}>IMÓVEL #1042</p>
          <p className="text-xs font-semibold text-slate-800">Apto Setor Bueno · 87 m²</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-violet-600 px-2.5 py-1.5 text-[11px] font-semibold text-white">
          <Sparkles className="w-3 h-3" /> Gerar descrição
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border border-slate-200 bg-white p-3 text-[11px] leading-relaxed text-slate-600 space-y-2"
      >
        <p>
          Apartamento de alto padrão no coração do Setor Bueno, com 87 m² de
          área privativa, 3 dormitórios — sendo uma suíte — e duas vagas de
          garagem.
        </p>
        <p>
          Posição de andar alto com ampla iluminação natural, a poucos minutos
          dos principais polos gastronômicos e de serviços da região.
        </p>
      </motion.div>
      <p className={`${mono} flex items-center gap-1.5 text-[10px] text-slate-400`}>
        <Check className="w-3 h-3 text-emerald-500" />
        gerado em 2,3s · sem emoji · padrão dos portais
      </p>
    </div>
  );
}

function MockResumo() {
  const acoes = [
    "Ligar hoje: cliente pediu retorno após a visita",
    "Enviar 2 opções de garden no mesmo condomínio",
    "Confirmar condição de financiamento até sexta",
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-800">Carlos Mendes</p>
          <p className={`${mono} text-[10px] text-slate-400`}>LEAD · 14 interações</p>
        </div>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          Em negociação
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-lg border border-violet-200 bg-violet-50/60 p-3"
      >
        <p className={`${mono} flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-700 mb-1.5`}>
          <Sparkles className="w-3 h-3" /> Resumo da IA
        </p>
        <p className="text-[11px] leading-relaxed text-slate-600">
          Visitou o Apto 302 e gostou, mas tem dúvida sobre o valor e quer
          comparar com unidades maiores. Sensível a prazo de financiamento.
        </p>
      </motion.div>
      <div>
        <p className={`${mono} text-[10px] uppercase tracking-wide text-slate-400 mb-1.5`}>Próximas ações</p>
        <div className="space-y-1.5">
          {acoes.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="flex items-start gap-2 text-[11px] text-slate-700"
            >
              <span className="mt-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border border-violet-300 text-violet-500">
                <Check className="w-2.5 h-2.5" />
              </span>
              {a}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockMatch() {
  const matches = [
    { ref: "AP1042", title: "Apto 302 · Setor Bueno", score: 96, reason: "Bate quartos, faixa de preço e bairro de interesse" },
    { ref: "AP0987", title: "Garden 04 · Setor Marista", score: 89, reason: "Mesmo perfil, área maior dentro do orçamento" },
    { ref: "AP1190", title: "Apto 71 · Jardim Goiás", score: 81, reason: "Aderente, porém acima da metragem desejada" },
  ];
  return (
    <div className="space-y-2.5">
      <p className={`${mono} text-[10px] text-slate-400`}>
        LEAD <span className="font-semibold text-slate-600">Ana Souza</span> · 3 imóveis ranqueados pela IA
      </p>
      {matches.map((m, i) => (
        <motion.div
          key={m.ref}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 + i * 0.09 }}
          className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2.5"
        >
          <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gradient-to-br from-slate-200 to-slate-100" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-800 truncate">{m.title}</p>
            <p className="text-[10px] text-slate-500 truncate">{m.reason}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className={`${mono} text-sm font-semibold text-violet-600`}>{m.score}%</p>
            <p className={`${mono} text-[9px] uppercase tracking-wide text-slate-400`}>match</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MockCertidoes() {
  // Órgãos/certidões reais emitidos pela plataforma.
  const docs = [
    { nome: "CNDT — débitos trabalhistas", orgao: "TST", status: "Negativa", ok: true },
    { nome: "Débitos estaduais", orgao: "SEFAZ-GO", status: "Negativa", ok: true },
    { nome: "Distribuição cível 1ª inst.", orgao: "TJGO", status: "1 ação localizada", ok: false },
    { nome: "Justiça Federal", orgao: "TRF1", status: "Negativa", ok: true },
  ];
  return (
    <div className="space-y-3">
      <p className={`${mono} text-[10px] text-slate-400`}>
        PROPONENTE <span className="font-semibold text-slate-600">João da Silva</span> · 4 certidões emitidas
      </p>
      <div className="space-y-1.5">
        {docs.map((d, i) => (
          <motion.div
            key={d.nome}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.08 }}
            className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-2.5 py-2"
          >
            <span className="flex items-center gap-2 text-[11px] text-slate-700">
              <span className={`${mono} rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500`}>
                {d.orgao}
              </span>
              {d.nome}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                d.ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {d.status}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-lg border border-violet-200 bg-violet-50/60 p-3"
      >
        <p className={`${mono} flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-700 mb-1`}>
          <Sparkles className="w-3 h-3" /> Leitura da IA
        </p>
        <p className="text-[11px] leading-relaxed text-slate-600">
          1 pendência: execução fiscal localizada na distribuição cível do TJGO.
          Recomenda-se solicitar a certidão de objeto e pé antes de prosseguir.
        </p>
      </motion.div>
    </div>
  );
}

const aiFeatures = [
  {
    icon: ClipboardPaste,
    title: "Cadastro com autofill",
    tag: "NO CADASTRO DO IMÓVEL",
    desc: "Cole a descrição de um imóvel — de um portal, de um WhatsApp, de qualquer lugar — e a IA extrai e preenche os campos para você só conferir.",
    window: "novo-imovel / importar",
    mock: MockAutofill,
  },
  {
    icon: PenLine,
    title: "Descrição de anúncio",
    tag: "NA FICHA DO IMÓVEL",
    desc: "Com o imóvel cadastrado, um clique gera um texto de venda no padrão dos grandes portais — sem clichê, sem emoji, pronto para publicar.",
    window: "imovel-1042 / descricao",
    mock: MockDescricao,
  },
  {
    icon: UserSearch,
    title: "Resumo de lead",
    tag: "NO CRM",
    desc: "A IA lê todo o histórico e devolve um resumo curto com as próximas ações recomendadas. O corretor entra na conversa sabendo onde parou.",
    window: "lead / carlos-mendes",
    mock: MockResumo,
  },
  {
    icon: Combine,
    title: "Match imóvel ↔ cliente",
    tag: "NO CRM",
    desc: "A IA cruza o perfil e o interesse do cliente e ranqueia os imóveis disponíveis mais aderentes, explicando o porquê de cada indicação.",
    window: "match / lead-ana-souza",
    mock: MockMatch,
  },
  {
    icon: ShieldCheck,
    title: "Análise de certidões",
    tag: "NA DOCUMENTAÇÃO",
    desc: "Além de emitir as certidões automaticamente, a IA lê o conteúdo e aponta riscos e pendências em segundos.",
    window: "documentacao / proponente",
    mock: MockCertidoes,
  },
];

export function AIProduct() {
  const ref = useRef(null);
  const loopRef = useRef(null);
  const showRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const loopInView = useInView(loopRef, { once: true, margin: "-120px" });
  const showInView = useInView(showRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  const Mock = aiFeatures[active].mock;

  return (
    <section
      id="ia"
      className="relative overflow-hidden bg-[#0a0911] text-white section-padding"
    >
      {/* — Atmosfera: grade blueprint + glow violeta controlado + grão — */}
      <div className="absolute inset-0 pointer-events-none">
        {/* blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
        {/* horizon glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-violet-600/15 blur-[130px] rounded-full" />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <p className={`${mono} flex items-center gap-2 text-xs tracking-[0.2em] text-violet-300/80 mb-5`}>
            <span className="inline-block w-8 h-px bg-violet-400/50" />
            INTELIGÊNCIA ARTIFICIAL · NATIVA NO IMOBHUB
          </p>
          <h2 className={`${display} text-4xl md:text-6xl font-extrabold leading-[1.02] tracking-tight mb-6`}>
            IA por dentro da
            <br />
            operação <span className="text-violet-400">imobiliária.</span>
          </h2>
          <p className="text-lg text-white/55 leading-relaxed">
            Não é um chat genérico acoplado por fora. São modelos de linguagem
            integrados ao imobHUB que você já usa — atuando em cada etapa do
            processo, do cadastro do imóvel à análise documental do fechamento.
          </p>
        </motion.div>

        {/* — O LOOP em curva S — */}
        <div ref={loopRef} className="mb-28">
          <p className={`${mono} text-xs tracking-[0.2em] text-violet-300/70 mb-2`}>
            // O LOOP QUE MANTÉM TUDO VIVO
          </p>
          <h3 className={`${display} text-2xl md:text-3xl font-bold mb-12 max-w-2xl`}>
            Um áudio do corretor na rua vira sistema atualizado, agenda em dia e
            IA mais inteligente.
          </h3>

          {/* Desktop: traçado serpenteado com nós ancorados */}
          <div className="relative hidden lg:block" style={{ aspectRatio: "1000 / 340" }}>
            <svg viewBox="0 0 1000 340" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path
                d={LOOP_PATH}
                fill="none"
                stroke="url(#loopGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={loopInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
              {NODES.map((node, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={loopInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.25 + i * 0.28, type: "spring", stiffness: 260, damping: 18 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                >
                  <circle cx={node.x} cy={node.y} r="16" fill="#a78bfa" opacity="0.18" />
                  <circle cx={node.x} cy={node.y} r="7" fill="#0a0911" stroke="#a78bfa" strokeWidth="2.5" />
                </motion.g>
              ))}
            </svg>

            {/* Cards ancorados aos nós */}
            {loop.map((item, i) => {
              const node = NODES[i];
              const isTop = node.y < 170;
              return (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, y: isTop ? -12 : 12 }}
                  animate={loopInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.28, duration: 0.5 }}
                  className="absolute w-[19%]"
                  style={{
                    left: `${(node.x / 1000) * 100}%`,
                    top: isTop ? "auto" : `${((node.y + 30) / 340) * 100}%`,
                    bottom: isTop ? `${((340 - (node.y - 30)) / 340) * 100}%` : "auto",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4 text-violet-300" />
                      <span className={`${mono} text-[10px] text-violet-300/70`}>{item.n}</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1.5 leading-snug">{item.title}</p>
                    <p className="text-[11px] leading-relaxed text-white/50">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: timeline vertical */}
          <div className="lg:hidden space-y-3">
            {loop.map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, x: -10 }}
                animate={loopInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-violet-500/15 text-violet-300">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    <span className={`${mono} text-[10px] text-violet-300/60 mr-2`}>{item.n}</span>
                    {item.title}
                  </p>
                  <p className="text-[11px] leading-relaxed text-white/50 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resultado do loop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={loopInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-10 lg:mt-6 flex items-start gap-4 rounded-2xl border border-violet-400/25 bg-gradient-to-r from-violet-600/15 via-violet-600/5 to-transparent p-6"
          >
            <span className={`${display} text-3xl font-extrabold text-violet-400 leading-none`}>=</span>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Sistema sempre atualizado, gestão com{" "}
              <span className="text-white font-semibold">visibilidade real</span> e corretores
              assistidos em cada passo. <span className="text-violet-300">IA de verdade dentro da rotina da imobiliária</span> — não uma promessa de slide.
            </p>
          </motion.div>
        </div>

        {/* — Showcase interativo: função + janela do produto — */}
        <div ref={showRef} className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center mb-16">
          {/* Lista */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={showInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className={`${mono} text-xs tracking-[0.2em] text-violet-300/70 mb-3`}>
              // CINCO FUNÇÕES, DENTRO DAS TELAS DE SEMPRE
            </p>
            <h3 className={`${display} text-2xl md:text-3xl font-bold text-white mb-6`}>
              A IA aparece onde o corretor já trabalha.
            </h3>
            <div className="space-y-2">
              {aiFeatures.map((feature, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={feature.title}
                    onClick={() => setActive(i)}
                    className={`w-full text-left flex items-start gap-3 rounded-r-lg border-l-2 py-3.5 pl-4 pr-4 transition-all duration-200 ${
                      isActive
                        ? "border-l-violet-400 bg-violet-500/10"
                        : "border-l-white/10 bg-transparent hover:border-l-white/30 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                        isActive ? "bg-violet-500 text-white" : "bg-violet-500/10 text-violet-300/70"
                      }`}
                    >
                      <feature.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`${mono} text-[10px] tracking-wider ${isActive ? "text-violet-300" : "text-violet-300/50"}`}>
                        {feature.tag}
                      </span>
                      <p className="font-semibold text-sm text-white mt-0.5">{feature.title}</p>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs leading-relaxed text-white/55 mt-1.5 overflow-hidden"
                          >
                            {feature.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Janela do produto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={showInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-violet-600/15 rounded-3xl blur-2xl" />
            <div className="relative rounded-xl bg-white shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)] overflow-hidden ring-1 ring-white/10">
              {/* Title bar */}
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className={`${mono} flex-1 text-center text-[11px] text-slate-400`}>
                  imobhub.app / {aiFeatures[active].window}
                </span>
                <span className={`${mono} inline-flex items-center gap-1 text-[10px] font-semibold text-violet-500`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" /> IA
                </span>
              </div>
              {/* Content */}
              <div className="p-5 min-h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Mock />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ponte para o agente no WhatsApp */}
        <motion.a
          href="#ai-agent"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-6 mb-4 rounded-2xl border border-violet-400/25 bg-white/[0.03] hover:border-violet-400/50 hover:bg-white/[0.05] transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-violet-500/20 text-violet-200">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className={`${mono} text-[10px] tracking-wider text-violet-300/70 mb-0.5`}>// TAMBÉM NO WHATSAPP DO CORRETOR</p>
              <p className="font-semibold text-sm text-white">
                O agente conversacional opera o CRM por linguagem natural
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-violet-200 whitespace-nowrap group-hover:gap-2 transition-all">
            Ver as 19 ações do agente
            <ArrowRight className="w-4 h-4" />
          </span>
        </motion.a>

        {/* Créditos — menção leve, sem números */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-violet-500/15 text-violet-200">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Modelo de consumo, com controle total</p>
              <p className="text-xs text-white/55 max-w-md">
                Cada ação de IA debita créditos, com painel de acompanhamento em
                tempo real e limites configuráveis por operação. Você paga pelo
                uso, sem custo fixo embutido.
              </p>
            </div>
          </div>
          <Button
            className={`${mono} rounded-full whitespace-nowrap bg-violet-500 hover:bg-violet-600 text-white border-0 text-xs tracking-wider uppercase`}
            asChild
          >
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
              Ver a IA na prática
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
