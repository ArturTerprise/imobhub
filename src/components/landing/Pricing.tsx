import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "./LeadForm";

const MIN_USERS = "A partir de 5 usuários";

const plans = [
  {
    name: "Plano Inicial",
    audience: "O essencial pra captar e vender",
    price: "125",
    unit: "/usuário/mês",
    minUsers: MIN_USERS,
    source: "pricing_inicial",
    highlight: false,
    features: [
      "CRM e funil de leads (kanban)",
      "Site imobiliário (vitrine)",
      "Estoque e catálogo de imóveis",
      "Distribuição automática de leads",
      "Integrações com portais e WhatsApp",
      "Suporte por WhatsApp e e-mail",
    ],
  },
  {
    name: "Plano Crescimento",
    audience: "A operação completa",
    price: "160",
    unit: "/usuário/mês",
    minUsers: MIN_USERS,
    source: "pricing_crescimento",
    highlight: true,
    features: [
      "Tudo do Plano Inicial",
      "Portal de vendas completo: propostas, contratos e secretaria",
      "Gestão de equipes, comissões e RH",
      "Dashboards e relatórios avançados",
      "IA nativa: anúncios, resumo de leads e match (uso por créditos)",
      "Onboarding guiado e suporte prioritário",
    ],
  },
  {
    name: "Plano Escala",
    audience: "Tudo, com automações e serviço dedicado",
    price: "200",
    unit: "/usuário/mês",
    minUsers: MIN_USERS,
    source: "pricing_escala",
    highlight: false,
    features: [
      "Tudo do Plano Crescimento",
      "Agente de IA no WhatsApp + extensão Copiloto (uso por créditos)",
      "Automação de certidões",
      "Módulo de locação e operações",
      "Verificação de CRECI em massa",
      "Gerente de conta dedicado, migração assistida e prioridade no roadmap",
    ],
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { open } = useLeadForm();

  return (
    <section id="planos" className="section-padding bg-secondary/30 relative">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full">
            Planos e Preços
          </span>
          <h2 className="heading-section mb-6">
            Feito para imobiliárias.
            <br />
            <span className="text-gradient">Do começo à escala.</span>
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Construímos o imobHUB com foco total em imobiliárias — revenda,
            lançamento e locação. Escolha o plano pela entrega que a sua operação
            precisa. O preço é por usuário (mínimo de 5) e a IA nativa é cobrada
            por créditos, conforme o uso.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative flex flex-col rounded-2xl p-8 border ${
                plan.highlight
                  ? "border-accent bg-card shadow-xl shadow-accent/10 lg:scale-[1.03]"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-accent text-white">
                  Mais popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.audience}
                </p>
              </div>

              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-muted-foreground">
                  R$
                </span>
                <span className="text-5xl font-bold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.unit}</span>
              </div>
              <p className="text-sm font-medium text-accent mb-6">
                {plan.minUsers}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() =>
                  open({
                    plan: plan.name,
                    source: plan.source,
                  })
                }
                className={`w-full rounded-full group ${
                  plan.highlight ? "btn-accent" : ""
                }`}
                variant={plan.highlight ? "default" : "outline"}
              >
                Tenho interesse
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Valores por usuário/mês, contratação mínima de 5 usuários, sem taxa de
          adesão escondida. A IA nativa é cobrada por créditos, conforme o uso.
          Fale com a gente para uma proposta sob medida para a sua imobiliária.
        </p>
      </div>
    </section>
  );
}
