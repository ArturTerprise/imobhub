import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5562994616268?text=Olá! Gostaria de saber mais sobre o ImobHub.";
const CALENDLY_LINK = "https://calendly.com/artur-terprise/30min";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="heading-section mb-6">
            Pronto para transformar
            <br />
            <span className="text-gradient">sua operação?</span>
          </h2>
          <p className="text-body-large mb-10">
            Agende uma demonstração gratuita e descubra como o ImobHub 
            pode otimizar seus processos e aumentar suas vendas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-accent text-base px-8 py-6 h-auto rounded-full group w-full sm:w-auto" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5" />
                Agendar Demonstração
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="btn-outline text-base px-8 py-6 h-auto w-full sm:w-auto"
              asChild
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Falar pelo WhatsApp
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Sem compromisso. Demonstração personalizada para sua empresa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
