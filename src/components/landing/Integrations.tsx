import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, MessageSquare, FileSignature, CreditCard } from "lucide-react";

import imobitech from "@/assets/integrations/imobitech.png";
import whatsapp from "@/assets/integrations/whatsapp.png";
import meta from "@/assets/integrations/meta.png";
import canalpro from "@/assets/integrations/canalpro.png";
import chavesnamao from "@/assets/integrations/chavesnamao.png";
import imovelweb from "@/assets/integrations/imovelweb.png";
import imoveis62 from "@/assets/integrations/62imoveis.png";
import autentique from "@/assets/integrations/autentique.png";
import d4sign from "@/assets/integrations/d4sign.png";
import docusign from "@/assets/integrations/docusign.png";

const integrationCategories = [
  {
    title: "Portais Imobiliários",
    description: "Publique seus imóveis automaticamente nos principais portais",
    icon: Building2,
    integrations: [
      { name: "Canal Pro", logo: canalpro },
      { name: "Chaves na Mão", logo: chavesnamao },
      { name: "62 Imóveis", logo: imoveis62 },
      { name: "Imóvel Web", logo: imovelweb },
    ],
  },
  {
    title: "Comunicação",
    description: "Conecte-se com seus leads e clientes onde eles estão",
    icon: MessageSquare,
    integrations: [
      { name: "WhatsApp", logo: whatsapp },
      { name: "Meta", logo: meta },
    ],
  },
  {
    title: "Assinatura Digital",
    description: "Contratos assinados digitalmente com validade jurídica",
    icon: FileSignature,
    integrations: [
      { name: "Autentique", logo: autentique },
      { name: "DocuSign", logo: docusign },
      { name: "D4Sign", logo: d4sign },
    ],
  },
  {
    title: "Pagamentos & Comissões",
    description: "Split de pagamentos automático para sua equipe",
    icon: CreditCard,
    integrations: [
      { name: "Imobitech", logo: imobitech },
    ],
  },
];

export function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="integrations" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full">
              Integrações Nativas
            </span>
            <h2 className="heading-section mb-6">
              Conectado a tudo que
              <br />
              <span className="text-gradient">você já usa.</span>
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
              Integrações prontas para usar com os principais portais de imóveis, 
              redes sociais, assinadores digitais e sistemas de pagamento.
            </p>
          </motion.div>

          {/* Integration Categories Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {integrationCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * catIndex }}
                className="bg-card rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  {category.integrations.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.2 + 0.05 * index }}
                      className="group"
                    >
                      <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
                        <img
                          src={integration.logo}
                          alt={integration.name}
                          className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Coming Soon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              E ainda: Google Ads, Facebook Ads, RD Station e muito mais em breve
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Google Ads", "Facebook Ads", "RD Station"].map((name, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm bg-secondary rounded-full text-muted-foreground border border-border/50"
                >
                  {name}
                </span>
              ))}
              <span className="px-4 py-2 text-sm bg-accent/10 rounded-full text-accent font-medium">
                + em breve
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
