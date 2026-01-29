import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  LayoutDashboard,
  FileText,
  MessageCircle,
  Zap,
  BarChart3,
  Users,
  FileCheck,
  Share2,
} from "lucide-react";

const mainFeatures = [
  {
    icon: Globe,
    title: "Site Imobiliário",
    subtitle: "Vitrine Digital",
    description:
      "Design moderno, alta performance e totalmente integrado ao seu CRM. O primeiro passo para capturar seu cliente.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Portal de Vendas",
    subtitle: "Secretaria Completa",
    description:
      "O coração da sua operação. Controle total da secretaria de vendas, gestão de contratos e distribuição automática de leads.",
    color: "from-accent/20 to-orange-400/20",
  },
  {
    icon: FileText,
    title: "CRM Inteligente",
    subtitle: "Gestão de Leads",
    description:
      "Acompanhe cada etapa do processo de vendas, do primeiro contato até a conversão. Nenhuma oportunidade perdida.",
    color: "from-emerald-500/20 to-green-500/20",
  },
];

const additionalFeatures = [
  {
    icon: MessageCircle,
    title: "Fila de Distribuição",
    description:
      "Leads distribuídos automaticamente no WhatsApp dos corretores com filtros exclusivos.",
  },
  {
    icon: FileCheck,
    title: "Automação de Certidões",
    description:
      "Busca automática de certidões para imóveis de revenda. Sem processos manuais.",
  },
  {
    icon: Zap,
    title: "Gerador de PDF",
    description:
      "Crie materiais profissionais com detalhes e fotos dos empreendimentos automaticamente.",
  },
  {
    icon: Share2,
    title: "Integrações Nativas",
    description:
      "Conectado aos principais portais, Facebook, WhatsApp e assinadores digitais.",
  },
  {
    icon: Users,
    title: "Controle de RH",
    description:
      "Módulo completo para gestão de equipes, comissões e performance.",
  },
  {
    icon: BarChart3,
    title: "Dashboards Completos",
    description:
      "Relatórios e métricas em tempo real para decisões estratégicas ágeis.",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="section-padding bg-secondary/30 relative">
      <div className="container-custom">
        <div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full">
              Ecossistema Completo
            </span>
            <h2 className="heading-section mb-6">
              Tudo o que você precisa.
              <br />
              <span className="text-gradient">Em um só lugar.</span>
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
              Módulos integrados ou plataforma completa no formato SaaS. 
              Você escolhe como usar.
            </p>
          </motion.div>

          {/* Main Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="feature-card group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-foreground" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 block">
                  {feature.subtitle}
                </span>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + 0.05 * index }}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-accent/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
