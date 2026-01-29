import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Blog from "./pages/Blog";
import Carreiras from "./pages/Carreiras";
import Ajuda from "./pages/Ajuda";
import Contato from "./pages/Contato";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import NotFound from "./pages/NotFound";

// Blog posts
import CrmImobiliario from "./pages/blog/CrmImobiliario";
import IntegracaoPortais from "./pages/blog/IntegracaoPortais";
import GestaoComissoes from "./pages/blog/GestaoComissoes";
import AssinaturaDigital from "./pages/blog/AssinaturaDigital";
import WhatsAppImobiliarias from "./pages/blog/WhatsAppImobiliarias";
import SiteImobiliario from "./pages/blog/SiteImobiliario";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/crm-imobiliario" element={<CrmImobiliario />} />
          <Route path="/blog/integracao-portais" element={<IntegracaoPortais />} />
          <Route path="/blog/gestao-comissoes" element={<GestaoComissoes />} />
          <Route path="/blog/assinatura-digital" element={<AssinaturaDigital />} />
          <Route path="/blog/whatsapp-imobiliarias" element={<WhatsAppImobiliarias />} />
          <Route path="/blog/site-imobiliario" element={<SiteImobiliario />} />
          <Route path="/carreiras" element={<Carreiras />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
