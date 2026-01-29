import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { Features } from "@/components/landing/Features";
import { Integrations } from "@/components/landing/Integrations";
import { Stats } from "@/components/landing/Stats";
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
        <Integrations />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
