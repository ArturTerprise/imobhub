import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "./LeadForm";

const plans = [
  {
    name: "Plano Inicial",
    audience: "Para imobiliárias enxutas",
    price: "1.000",
    unit: "/mês",
    users: "1 a 5 usuários",
    userRange: "1 a 5 usuários",
    source: "pricing_inicial",
    highlight: false,
    features: [
      "Plataforma completa (CRM, site e portal de vendas)",
      "Funil de leads e distribuição automática",
      "Até 5 usuários",
      "Integrações com portais e WhatsApp",
      "Suporte técnico de verdade",
    ],
  },
  {
    name: "Plano Crescimento",
    audience: "Para equipes em expansão",
    price: "3.000",
    unit: "/mês",
    users: "5 a 20 usuários",
    userRange: "5 a 20 usuários",
    source: "pricing_crescimento",
    highlight: true,
    features: [
      "Tudo do Plano Inicial",
      "Até 20 usuários",
      "IA nativa (descrição de anúncios, match e resumo de leads)",
      "Agente de WhatsApp com IA",
      "Gestão de equipes, comissões e RH",
      "Dashboards e relatórios avançados",
    ],
  },
  {
    name: "Plano Escala",
    audience: "Para grandes operações",
    price: "100",
    unit: "/usuário/mês",
    users: "Acima de 20 corretores",
    userRange: "Mais de 50 usuários",
    source: "pricing_escala",
    highlight: false,
    features: [
      "Tudo do Plano Crescimento",
      "Usuários ilimitados (R$ 100 por usuário)",
      "Onboarding e migração assistida",
      "Gerente de conta dedicado",
      "Prioridade no suporte e em novas funções",
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
            lançamento e locação. Escolha o plano que acompanha o tamanho da sua
            operação.
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
              <p className="text-sm font-medium text-accent mb-6">{plan.users}</p>

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
                    userRange: plan.userRange,
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
          Valores mensais. Sem taxa de adesão escondida. Fale com a gente para
          uma proposta sob medida para a sua imobiliária.
        </p>
      </div>
    </section>
  );
}
