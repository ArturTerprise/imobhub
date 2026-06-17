import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Check,
  CornerDownRight,
  ArrowLeft,
  ClipboardPaste,
  LayoutDashboard,
  Briefcase,
  Boxes,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const mono = "font-['IBM_Plex_Mono']";
const display = "font-['Bricolage_Grotesque']";

const CYCLE_MS = 11000;

const SOURCE_TEXT =
  "Apartamento de 3 quartos sendo 1 suíte, 87m² no Setor Bueno. Andar alto, 2 vagas. Aceita financiamento. R$ 650 mil.";

const FIELDS: [string, string][] = [
  ["TIPO", "Apartamento"],
  ["DORMITÓRIOS", "3 (1 suíte)"],
  ["ÁREA PRIVATIVA", "87 m²"],
  ["BAIRRO", "Setor Bueno"],
  ["VAGAS", "2"],
  ["VALOR", "R$ 650.000"],
];

const DESC_LINES = [
  "Apartamento de alto padrão no coração do Setor Bueno, com 87 m² de área privativa, 3 dormitórios — sendo uma suíte — e duas vagas de garagem.",
  "Posição de andar alto com ampla iluminação natural, a poucos minutos dos principais polos gastronômicos e de serviços da região.",
];

const RAIL = [LayoutDashboard, Briefcase, Boxes, ShieldCheck, BarChart3];

// Timeline (segundos) — referência única do roteiro do demo.
const T = {
  paste: 0.4,
  extracting: 1.5,
  fieldsBase: 2.2,
  fieldStep: 0.32,
  button: 4.6,
  genLabel: 5.3,
  descBase: 5.7,
  descStep: 0.6,
  done: 7.6,
};

export default function DemoIA() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0911] text-white relative overflow-hidden">
      {/* Atmosfera (igual à seção de IA) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, black 40%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-violet-600/15 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        {/* Topo */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className={`${mono} inline-flex items-center gap-2 text-xs tracking-wider text-white/50 hover:text-white transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" /> VOLTAR AO SITE
          </Link>
          <span className={`${mono} inline-flex items-center gap-1.5 text-[10px] font-semibold text-violet-300`}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /> DEMO AO VIVO
          </span>
        </div>

        {/* Header */}
        <p className={`${mono} flex items-center gap-2 text-xs tracking-[0.2em] text-violet-300/80 mb-4`}>
          <span className="inline-block w-8 h-px bg-violet-400/50" />
          IA DO IMOBHUB · EM AÇÃO
        </p>
        <h1 className={`${display} text-3xl md:text-5xl font-extrabold leading-tight mb-3`}>
          Do anúncio colado ao
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            cadastro completo, sozinho.
          </span>
        </h1>
        <p className="text-white/55 max-w-xl mb-8">
          O corretor cola um texto qualquer; a IA lê, preenche os campos e ainda
          escreve a descrição de venda. Tudo dentro do imobHUB. (Reproduz em loop.)
        </p>

        {/* Janela do produto */}
        <div className="relative">
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
                imobhub.app / novo-imovel / importar
              </span>
              <span className={`${mono} inline-flex items-center gap-1 text-[10px] font-semibold text-violet-500`}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" /> IA
              </span>
            </div>

            {/* Progress da reprodução */}
            <div className="h-0.5 bg-slate-100">
              <motion.div
                key={`bar-${cycle}`}
                className="h-full bg-violet-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
              />
            </div>

            {/* Shell: rail + conteúdo */}
            <div className="flex">
              <aside className="hidden sm:flex w-12 flex-col items-center gap-1 border-r border-slate-200 bg-slate-50/70 py-3">
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-[11px] font-bold text-white">
                  i
                </div>
                {RAIL.map((Icon, i) => (
                  <div
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      i === 2 ? "bg-violet-100 text-violet-600" : "text-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </aside>

              {/* Cena (replay a cada ciclo via key) */}
              <div key={`scene-${cycle}`} className="flex-1 p-5 min-h-[460px]">
                {/* 1) Texto colado */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: T.paste, duration: 0.5 }}
                  className="rounded-lg bg-slate-100 border border-slate-200 p-3 text-[12px] leading-relaxed text-slate-600"
                >
                  <span className={`${mono} flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5`}>
                    <ClipboardPaste className="w-3.5 h-3.5" /> Texto colado pelo corretor
                  </span>
                  “{SOURCE_TEXT}”
                </motion.div>

                {/* 2) IA extraindo */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: T.extracting, duration: 0.4 }}
                  className={`${mono} flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-violet-600 my-3`}
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  IA lendo e preenchendo os campos…
                </motion.div>

                {/* 3) Campos preenchendo */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FIELDS.map(([label, value], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: T.fieldsBase + i * T.fieldStep, type: "spring", stiffness: 280, damping: 20 }}
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

                {/* 4) Botão gerar descrição */}
                <motion.button
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0, boxShadow: ["0 0 0 0 rgba(124,58,237,0)", "0 0 0 6px rgba(124,58,237,0.18)", "0 0 0 0 rgba(124,58,237,0)"] }}
                  transition={{ delay: T.button, duration: 1.1 }}
                  className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-violet-600 px-3 py-2 text-[12px] font-semibold text-white"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Gerar descrição com IA
                </motion.button>

                {/* 5) Descrição gerada (só aparece na fase certa) */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: T.genLabel, duration: 0.4 }}
                >
                  <div className={`${mono} flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600 mt-3 mb-1.5`}>
                    <CornerDownRight className="w-3.5 h-3.5" /> Descrição gerada a partir dos campos
                  </div>
                  <div className="rounded-lg border border-violet-200 bg-violet-50/40 p-3 text-[12px] leading-relaxed text-slate-600 space-y-2">
                    {DESC_LINES.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: T.descBase + i * T.descStep, duration: 0.5 }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                {/* 6) Pronto */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: T.done, duration: 0.4 }}
                  className={`${mono} flex items-center gap-1.5 text-[10px] text-slate-400 mt-3`}
                >
                  <Check className="w-3 h-3 text-emerald-500" />
                  cadastro preenchido + descrição gerada em segundos · sem digitar nada
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        <p className={`${mono} text-center text-[10px] text-white/30 mt-6`}>
          mockup ilustrativo · dados fictícios
        </p>
      </div>
    </div>
  );
}
