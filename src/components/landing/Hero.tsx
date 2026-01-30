import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArcadeEmbed } from "./ArcadeEmbed";

// Client logos
import kamanzi from "@/assets/clients/kamanzi.png";
import alfacenter from "@/assets/clients/alfacenter.png";
import aevo from "@/assets/clients/aevo.png";
import gd from "@/assets/clients/gd.png";

const CALENDLY_LINK = "https://calendly.com/artur-terprise/30min";

const clientLogos = [kamanzi, alfacenter, aevo, gd];

export function Hero() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-accent/10 border border-accent/20"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              A plataforma escolhida por mais de 80 imobiliárias
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-display mb-6"
          >
            O futuro da gestão
            <br />
            imobiliária.{" "}
            <span className="text-gradient">Chegou.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-large max-w-2xl mx-auto mb-10"
          >
            O ecossistema completo que une CRM, site, portal de vendas e automações 
            em uma única plataforma. Simplifique para focar no que importa: fechar negócios.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button className="btn-accent text-base px-8 py-6 h-auto rounded-full group" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Agendar Demonstração
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="text-base px-8 py-6 h-auto rounded-full gap-2 group"
              onClick={() => setShowDemo(true)}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play className="w-4 h-4 fill-current" />
              </div>
              Ver como funciona
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {clientLogos.map((logo, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-background border-2 border-background overflow-hidden shadow-md"
                  >
                    <img 
                      src={logo} 
                      alt="Cliente" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">+80 clientes ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">97%</span>
              <span className="text-sm">satisfação</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Suporte</span>
              <span className="text-lg font-bold text-accent">técnico de verdade</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-5xl bg-background rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4">
              <ArcadeEmbed />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
