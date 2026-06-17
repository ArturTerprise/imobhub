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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY_LINK = "https://calendly.com/artur-terprise/30min";

// A jornada do dia a dia da imobiliária — e onde a IA entra em cada etapa.
const workflow = [
  { step: "Cadastrar", title: "Imóvel no sistema", ai: "Cole o anúncio antigo e a IA preenche os campos sozinha." },
  { step: "Anunciar", title: "Publicar nos portais", ai: "Descrição profissional gerada pela IA, no padrão dos portais." },
  { step: "Atender", title: "Trabalhar o lead", ai: "Resumo do lead e as próximas ações sugeridas, sem ler tudo." },
  { step: "Casar", title: "Oferta certa", ai: "A IA cruza o perfil do cliente e ranqueia os imóveis ideais." },
  { step: "Fechar", title: "Documentação", ai: "Análise de certidões por IA — risco lido em segundos." },
];

// ——— Mockups de cada função (janela de app, tom de print do produto) ———

function MockAutofill() {
  const fields = [
    ["Tipo", "Apartamento"],
    ["Quartos", "3"],
    ["Suítes", "1"],
    ["Área privativa", "87 m²"],
    ["Bairro", "Setor Bueno"],
    ["Valor", "R$ 650.000"],
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-slate-100 border border-slate-200 p-3 text-[11px] leading-relaxed text-slate-500">
        “Apartamento de 3 quartos sendo 1 suíte, 87m² no Setor Bueno. Andar
        alto, 2 vagas. Aceita financiamento. R$ 650 mil.”
        <span className="ml-1 text-slate-400">— colado de outro anúncio</span>
      </div>
      <div className="flex items-center gap-2 text-[11px] font-semibold text-violet-600">
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
              <p className="text-[9px] uppercase tracking-wide text-slate-400">{label}</p>
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
          <p className="text-[10px] uppercase tracking-wide text-slate-400">Imóvel #1042</p>
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
      <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
        <Check className="w-3 h-3 text-emerald-500" />
        Gerado em 2,3s · sem emoji · padrão dos portais
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
          <p className="text-[10px] text-slate-400">Lead · 14 interações</p>
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
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-700 mb-1.5">
          <Sparkles className="w-3 h-3" /> Resumo da IA
        </p>
        <p className="text-[11px] leading-relaxed text-slate-600">
          Visitou o Apto 302 e gostou, mas tem dúvida sobre o valor e quer
          comparar com unidades maiores. Sensível a prazo de financiamento.
        </p>
      </motion.div>
      <div>
        <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1.5">Próximas ações</p>
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
      <p className="text-[10px] text-slate-400">
        Lead <span className="font-semibold text-slate-600">Ana Souza</span> · 3 imóveis ranqueados pela IA
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
            <p className="text-sm font-bold text-violet-600">{m.score}%</p>
            <p className="text-[9px] uppercase tracking-wide text-slate-400">match</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MockCertidoes() {
  const docs = [
    { nome: "Certidão de ônus reais", status: "Negativa", ok: true },
    { nome: "Certidão fiscal municipal", status: "Negativa", ok: true },
    { nome: "Distribuição cível (1ª instância)", status: "1 ação encontrada", ok: false },
  ];
  return (
    <div className="space-y-3">
      <p className="text-[10px] text-slate-400">
        Proponente <span className="font-semibold text-slate-600">João da Silva</span> · 3 certidões emitidas
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
            <span className="text-[11px] text-slate-700">{d.nome}</span>
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
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-700 mb-1">
          <Sparkles className="w-3 h-3" /> Leitura da IA
        </p>
        <p className="text-[11px] leading-relaxed text-slate-600">
          1 pendência identificada: ação cível em andamento contra o
          proponente. Recomenda-se solicitar a certidão de objeto e pé antes de
          prosseguir.
        </p>
      </motion.div>
    </div>
  );
}

const aiFeatures = [
  {
    icon: ClipboardPaste,
    title: "Cadastro com autofill",
    tag: "No cadastro do imóvel",
    desc: "Cole a descrição de um imóvel — de um portal, de um WhatsApp, de qualquer lugar — e a IA extrai e preenche os campos para você só conferir.",
    window: "Novo imóvel · Importar texto",
    mock: MockAutofill,
  },
  {
    icon: PenLine,
    title: "Descrição de anúncio",
    tag: "Na ficha do imóvel",
    desc: "Com o imóvel cadastrado, um clique gera um texto de venda no padrão dos grandes portais — sem clichê, sem emoji, pronto para publicar.",
    window: "Imóvel #1042 · Descrição",
    mock: MockDescricao,
  },
  {
    icon: UserSearch,
    title: "Resumo de lead",
    tag: "No CRM",
    desc: "A IA lê todo o histórico e devolve um resumo curto com as próximas ações recomendadas. O corretor entra na conversa sabendo onde parou.",
    window: "Lead · Carlos Mendes",
    mock: MockResumo,
  },
  {
    icon: Combine,
    title: "Match imóvel ↔ cliente",
    tag: "No CRM",
    desc: "A partir do interesse do lead, a IA ranqueia os imóveis disponíveis mais aderentes e explica o porquê de cada indicação.",
    window: "Match · Lead Ana Souza",
    mock: MockMatch,
  },
  {
    icon: ShieldCheck,
    title: "Análise de certidões",
    tag: "Na documentação",
    desc: "Além de emitir as certidões automaticamente, a IA lê o conteúdo e aponta riscos e pendências em segundos.",
    window: "Documentação · Proponente",
    mock: MockCertidoes,
  },
];

export function AIProduct() {
  const ref = useRef(null);
  const flowRef = useRef(null);
  const showRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const flowInView = useInView(flowRef, { once: true, margin: "-100px" });
  const showInView = useInView(showRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  const Mock = aiFeatures[active].mock;

  return (
    <section
      id="ia"
      className="relative overflow-hidden bg-[hsl(222_47%_7%)] text-white section-padding"
    >
      {/* Violet glow — a IA tem cor própria na marca */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
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
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-violet-200 bg-violet-500/15 rounded-full border border-violet-400/30">
            <Sparkles className="w-4 h-4" />
            Inteligência Artificial
          </span>
          <h2 className="heading-section mb-6 text-white">
            IA aplicada à operação
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              imobiliária, ponta a ponta.
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Não é um chat genérico acoplado por fora. São modelos de linguagem
            integrados ao imobHUB que você já usa, atuando em cada etapa do
            processo — do cadastro do imóvel à análise documental do fechamento.
          </p>
        </motion.div>

        {/* Workflow — onde a IA entra na rotina */}
        <div ref={flowRef} className="mb-20">
          <p className="text-center text-sm uppercase tracking-widest text-violet-300/70 mb-8 font-semibold">
            O mesmo fluxo de trabalho — com IA em cada etapa
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {workflow.map((stage, i) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                animate={flowInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 text-violet-200 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-violet-300/80 font-semibold">
                    {stage.step}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white/90 mb-2">{stage.title}</p>
                <p className="text-xs leading-relaxed text-white/55">
                  <Sparkles className="inline w-3 h-3 text-violet-300 mr-1 -mt-0.5" />
                  {stage.ai}
                </p>
                {i < workflow.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-4 h-4 text-violet-400/40 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Showcase interativo — função + mockup do produto */}
        <div ref={showRef} className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center mb-16">
          {/* Lista de funções */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={showInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-2.5"
          >
            <h3 className="text-2xl font-bold text-white mb-5">
              Cinco funções de IA, dentro das telas que o corretor já usa.
            </h3>
            {aiFeatures.map((feature, i) => {
              const isActive = i === active;
              return (
                <button
                  key={feature.title}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 ${
                    isActive
                      ? "border-violet-400/50 bg-violet-500/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                      isActive ? "bg-violet-500 text-white" : "bg-violet-500/15 text-violet-300"
                    }`}
                  >
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-semibold ${
                          isActive ? "text-violet-300" : "text-violet-300/60"
                        }`}
                      >
                        {feature.tag}
                      </span>
                    </div>
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
          </motion.div>

          {/* Janela de app com o mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={showInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-violet-600/20 rounded-3xl blur-2xl scale-95" />
            <div className="relative rounded-2xl bg-white shadow-2xl overflow-hidden border border-white/10">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="mx-auto text-[11px] font-medium text-slate-500">
                  imobHUB · {aiFeatures[active].window}
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

        {/* Bridge para o agente no WhatsApp */}
        <motion.a
          href="#ai-agent"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-6 mb-6 rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/10 hover:border-violet-400/60 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-violet-500/25 text-violet-200">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">
                A mesma IA, agora no WhatsApp do corretor
              </p>
              <p className="text-xs text-white/60 max-w-xl">
                O agente conversacional opera o CRM por linguagem natural — cria
                leads, agenda visitas e gera relatórios sem abrir o sistema.
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
          className="flex flex-col sm:flex-row items-center justify-center gap-5 p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-violet-500/20 text-violet-200">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">
                Modelo de consumo, com controle total
              </p>
              <p className="text-xs text-white/55 max-w-md">
                Cada ação de IA debita créditos, com painel de acompanhamento em
                tempo real e limites configuráveis por operação. Você paga pelo
                uso, sem custo fixo embutido.
              </p>
            </div>
          </div>
          <Button
            className="rounded-full whitespace-nowrap bg-violet-500 hover:bg-violet-600 text-white border-0"
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
