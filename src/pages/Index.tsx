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
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Problems />
        <Features />
        <AIProduct />
        <AIAgent />
        <Integrations />
        <Extension />
        <Stats />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
