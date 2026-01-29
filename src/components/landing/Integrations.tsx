import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import imobitech from "@/assets/integrations/imobitech.png";
import whatsapp from "@/assets/integrations/whatsapp.png";
import meta from "@/assets/integrations/meta.png";
import canalpro from "@/assets/integrations/canalpro.png";
import chavesnamao from "@/assets/integrations/chavesnamao.png";
import imovelweb from "@/assets/integrations/imovelweb.png";
import imoveis62 from "@/assets/integrations/62imoveis.png";

const integrations = [
  { name: "Canal Pro", logo: canalpro },
  { name: "Chaves na Mão", logo: chavesnamao },
  { name: "62 Imóveis", logo: imoveis62 },
  { name: "Imóvel Web", logo: imovelweb },
  { name: "WhatsApp", logo: whatsapp },
  { name: "Meta", logo: meta },
  { name: "Imobitech", logo: imobitech },
];

const additionalIntegrations = [
  "Autentique",
  "DocuSign",
  "D4Sign",
  "Facebook Ads",
  "Google Ads",
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
              Integrações
            </span>
            <h2 className="heading-section mb-6">
              Conectado a tudo que
              <br />
              <span className="text-gradient">você já usa.</span>
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
              Integrações nativas com os principais portais de imóveis, 
              redes sociais e ferramentas do mercado.
            </p>
          </motion.div>

          {/* Integration Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12"
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + 0.05 * index }}
                className="group"
              >
                <img
                  src={integration.logo}
                  alt={integration.name}
                  className="integration-logo"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Integrations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <span className="text-sm text-muted-foreground">E também:</span>
            {additionalIntegrations.map((name, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-secondary rounded-full text-muted-foreground"
              >
                {name}
              </span>
            ))}
            <span className="text-sm text-muted-foreground">+ muito mais</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
