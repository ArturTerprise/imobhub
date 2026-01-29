import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function IntegracaoPortais() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-hero-gradient">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Blog
              </Link>
              <span className="inline-block px-3 py-1 bg-accent/20 rounded-full text-sm text-accent font-medium mb-4">
                Marketing
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                A importância da integração com portais imobiliários
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Equipe ImobHub
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Janeiro 2025
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  4 min de leitura
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-headings:font-bold prose-a:text-accent"
            >
              <p className="lead text-lg text-muted-foreground">
                Publicar imóveis manualmente em diversos portais consome tempo precioso da sua equipe. 
                A integração automática não é apenas conveniência – é estratégia para escalar suas vendas.
              </p>

              <h2>O desafio da publicação manual</h2>
              <p>
                Imagine a rotina: cadastrar o mesmo imóvel no Canal Pro, depois no Chaves na Mão, 
                depois no Imóvel Web, depois no 62 Imóveis... E quando precisa atualizar o preço? 
                Fazer isso em cada portal, um por um.
              </p>
              <p>
                Esse processo manual não só consome horas do dia, mas também está sujeito a erros: 
                informações desatualizadas, fotos diferentes em cada portal, preços inconsistentes.
              </p>

              <h2>Benefícios da integração automática</h2>
              
              <h3>1. Economia de tempo</h3>
              <p>
                Cadastre uma vez, publique em todos os portais. Atualize uma vez, sincronize em 
                todos os lugares. O que antes levava horas agora leva minutos.
              </p>

              <h3>2. Consistência de informações</h3>
              <p>
                Todas as informações ficam padronizadas: fotos, descrições, preços e características 
                iguais em todos os portais. Isso transmite profissionalismo e evita confusões com clientes.
              </p>

              <h3>3. Maior alcance</h3>
              <p>
                Com a facilidade de publicação, você consegue estar presente em mais portais, 
                aumentando a visibilidade dos seus imóveis e atraindo mais leads.
              </p>

              <h3>4. Captação automática de leads</h3>
              <p>
                A integração não é só para enviar – é também para receber. Os leads que chegam 
                pelos portais são automaticamente importados para o CRM, prontos para distribuição.
              </p>

              <h2>Portais integrados ao ImobHub</h2>
              <p>
                O ImobHub oferece integração nativa com os principais portais do mercado:
              </p>
              <ul>
                <li><strong>Canal Pro</strong> – Um dos maiores portais do Brasil</li>
                <li><strong>Chaves na Mão</strong> – Forte presença regional</li>
                <li><strong>Imóvel Web</strong> – Referência nacional</li>
                <li><strong>62 Imóveis</strong> – Especializado em Goiás</li>
              </ul>

              <h2>Como funciona a integração de mão dupla</h2>
              <p>
                A verdadeira magia está na integração bidirecional:
              </p>
              <ul>
                <li><strong>Envio:</strong> Imóveis cadastrados no ImobHub são automaticamente 
                publicados nos portais selecionados</li>
                <li><strong>Recebimento:</strong> Leads que chegam pelos portais são automaticamente 
                importados para o CRM do ImobHub</li>
              </ul>
              <p>
                Isso significa que sua equipe trabalha em um único sistema, mas tem presença em 
                múltiplos canais de captação.
              </p>

              <h2>Distribuição inteligente de leads</h2>
              <p>
                Quando um lead chega de um portal, o ImobHub pode distribuí-lo automaticamente 
                para o corretor mais adequado, baseado em:
              </p>
              <ul>
                <li>Região do imóvel</li>
                <li>Tipo de imóvel (residencial, comercial)</li>
                <li>Faixa de preço</li>
                <li>Disponibilidade do corretor</li>
                <li>Rodízio equilibrado entre a equipe</li>
              </ul>

              <h2>Conclusão</h2>
              <p>
                A integração com portais imobiliários é fundamental para qualquer imobiliária 
                que quer escalar suas operações. O tempo economizado pode ser investido no que 
                realmente importa: atender bem os clientes e fechar negócios.
              </p>
              <p>
                Quer ver como funciona na prática? 
                <Link to="https://calendly.com/artur-terprise/30min" target="_blank"> Agende uma demonstração</Link> e 
                conheça todas as integrações do ImobHub.
              </p>
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
