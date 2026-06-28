import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { Features } from "@/components/landing/Features";
import { AIProduct } from "@/components/landing/AIProduct";
import { AIAgent } from "@/components/landing/AIAgent";
import { Integrations } from "@/components/landing/Integrations";
import { Extension } from "@/components/landing/Extension";
import { Stats } from "@/components/landing/Stats";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const location = useLocation();

  // Ao chegar na home vindo de uma página interna com âncora (ex.: /#planos),
  // rola até a seção. As imagens acima carregam progressivamente e empurram o
  // layout, então re-alinhamos a cada mudança de altura da página até ela
  // estabilizar (ou após um teto de ~4s), senão o scroll para na seção errada.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    let lastHeight = -1;
    let stableTicks = 0;
    let tick = 0;
    const iv = setInterval(() => {
      tick += 1;
      const el = document.getElementById(id);
      const height = document.documentElement.scrollHeight;
      if (height !== lastHeight) {
        lastHeight = height;
        stableTicks = 0;
        el?.scrollIntoView({ behavior: "auto" });
      } else {
        stableTicks += 1;
      }
      if (stableTicks >= 5 || tick >= 40) clearInterval(iv);
    }, 100);

    return () => clearInterval(iv);
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Problems />
        <Features />
        <AIProduct />
        <AIAgent />
        <Extension />
        <Integrations />
        <Stats />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
