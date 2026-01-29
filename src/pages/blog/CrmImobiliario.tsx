import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function CrmImobiliario() {
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
                Vendas
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Como aumentar suas vendas com um CRM imobiliário eficiente
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
                  5 min de leitura
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
                No mercado imobiliário atual, a diferença entre fechar uma venda e perder um cliente 
                para a concorrência pode estar na forma como você gerencia seus leads. Um CRM 
                imobiliário eficiente não é mais um luxo – é uma necessidade.
              </p>

              <h2>O que é um CRM imobiliário?</h2>
              <p>
                CRM significa Customer Relationship Management, ou Gestão de Relacionamento com o 
                Cliente. No contexto imobiliário, é uma ferramenta que centraliza todas as informações 
                dos seus leads, clientes, imóveis e negociações em um único lugar.
              </p>
              <p>
                Com um bom CRM, você consegue acompanhar toda a jornada do cliente, desde o primeiro 
                contato até o fechamento da venda e o pós-venda.
              </p>

              <h2>Por que sua imobiliária precisa de um CRM?</h2>
              <h3>1. Centralização de informações</h3>
              <p>
                Quantas vezes você já perdeu informações importantes de um lead porque estavam em 
                planilhas diferentes, WhatsApp, emails ou papéis? Com um CRM, tudo fica em um só lugar, 
                acessível a toda a equipe.
              </p>

              <h3>2. Acompanhamento do funil de vendas</h3>
              <p>
                Visualize exatamente em qual etapa cada lead está: primeiro contato, visita agendada, 
                proposta enviada, negociação ou fechamento. Isso permite ações direcionadas e no 
                momento certo.
              </p>

              <h3>3. Automação de follow-up</h3>
              <p>
                Leads esfriam rápido. Com automações de follow-up, você mantém contato constante 
                com seus potenciais clientes, mesmo quando a equipe está ocupada com outras atividades.
              </p>

              <h3>4. Métricas e relatórios</h3>
              <p>
                Entenda o desempenho da sua equipe, identifique gargalos no processo de vendas e 
                tome decisões baseadas em dados, não em achismos.
              </p>

              <h2>Funcionalidades essenciais de um CRM imobiliário</h2>
              <ul>
                <li><strong>Cadastro completo de leads e clientes</strong> com histórico de interações</li>
                <li><strong>Funil de vendas visual</strong> com arraste e solte</li>
                <li><strong>Integração com WhatsApp</strong> para comunicação direta</li>
                <li><strong>Integração com portais imobiliários</strong> para captura automática de leads</li>
                <li><strong>Agendamento de visitas</strong> com lembretes automáticos</li>
                <li><strong>Distribuição inteligente de leads</strong> entre corretores</li>
                <li><strong>Relatórios de performance</strong> individual e da equipe</li>
              </ul>

              <h2>Como o ImobHub pode ajudar</h2>
              <p>
                O ImobHub foi desenvolvido especificamente para o mercado imobiliário brasileiro. 
                Nossa plataforma oferece:
              </p>
              <ul>
                <li>CRM completo com todas as funcionalidades que você precisa</li>
                <li>Distribuição de leads via WhatsApp com filtros exclusivos</li>
                <li>Integração nativa com os principais portais (Canal Pro, Chaves na Mão, etc.)</li>
                <li>Portal de vendas para gestão de contratos e comissões</li>
                <li>Suporte especializado em menos de 2 horas</li>
              </ul>

              <h2>Conclusão</h2>
              <p>
                Investir em um CRM imobiliário não é apenas sobre organização – é sobre maximizar 
                cada oportunidade de venda. Com as ferramentas certas, sua equipe pode focar no que 
                realmente importa: construir relacionamentos e fechar negócios.
              </p>
              <p>
                Quer ver na prática como o ImobHub pode transformar sua operação? 
                <Link to="https://calendly.com/artur-terprise/30min" target="_blank"> Agende uma demonstração gratuita</Link> e 
                descubra como mais de 80 imobiliárias já estão vendendo mais com nossa plataforma.
              </p>
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
