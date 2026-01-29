import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function GestaoComissoes() {
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
                Gestão
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Gestão de comissões: como organizar os pagamentos da sua equipe
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
                  6 min de leitura
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
                A gestão de comissões é um dos maiores desafios de uma imobiliária. Erros de cálculo, 
                atrasos nos pagamentos e falta de transparência podem desmotivar sua equipe e gerar conflitos.
              </p>

              <h2>O problema das comissões mal gerenciadas</h2>
              <p>
                Comissões no mercado imobiliário são complexas. Em uma única venda, você pode ter:
              </p>
              <ul>
                <li>Corretor captador (quem trouxe o imóvel)</li>
                <li>Corretor vendedor (quem trouxe o cliente)</li>
                <li>Gerente da equipe</li>
                <li>Imobiliária parceira (em caso de parcerias)</li>
                <li>A própria imobiliária</li>
              </ul>
              <p>
                Calcular e distribuir corretamente esses valores, respeitando diferentes percentuais 
                e condições, pode ser um pesadelo quando feito manualmente.
              </p>

              <h2>Impactos de uma gestão ineficiente</h2>
              
              <h3>Desmotivação da equipe</h3>
              <p>
                Corretores que não confiam no sistema de comissões tendem a buscar outras imobiliárias. 
                A transparência é fundamental para manter uma equipe engajada.
              </p>

              <h3>Erros de pagamento</h3>
              <p>
                Pagamentos incorretos – seja a mais ou a menos – geram problemas. A mais, prejuízo 
                para a imobiliária. A menos, conflitos com a equipe.
              </p>

              <h3>Perda de tempo</h3>
              <p>
                Quanto tempo seu financeiro gasta calculando comissões em planilhas? Esse tempo 
                poderia ser investido em atividades mais estratégicas.
              </p>

              <h2>Boas práticas de gestão de comissões</h2>

              <h3>1. Defina regras claras</h3>
              <p>
                Tenha uma política de comissionamento documentada e conhecida por todos. Quais são 
                os percentuais? Como funciona em caso de parceria? Quando é feito o pagamento?
              </p>

              <h3>2. Automatize os cálculos</h3>
              <p>
                Use um sistema que calcule automaticamente as comissões baseado nas regras definidas. 
                Isso elimina erros humanos e garante consistência.
              </p>

              <h3>3. Dê visibilidade à equipe</h3>
              <p>
                Seus corretores devem conseguir acompanhar suas vendas e comissões pendentes. 
                Transparência gera confiança.
              </p>

              <h3>4. Integre com pagamentos</h3>
              <p>
                Se possível, integre a gestão de comissões com um sistema de split de pagamentos, 
                automatizando também a parte financeira.
              </p>

              <h2>Como o ImobHub resolve isso</h2>
              <p>
                O Portal de Vendas do ImobHub foi desenvolvido especificamente para resolver a 
                complexidade das comissões imobiliárias:
              </p>
              <ul>
                <li><strong>Cadastro de regras de comissionamento</strong> personalizáveis por tipo de venda</li>
                <li><strong>Cálculo automático</strong> com divisão entre todos os envolvidos</li>
                <li><strong>Painel do corretor</strong> para acompanhamento em tempo real</li>
                <li><strong>Integração com Imobitech</strong> para split automático de pagamentos</li>
                <li><strong>Relatórios completos</strong> para gestão e auditoria</li>
              </ul>

              <h2>A integração com Imobitech</h2>
              <p>
                O ImobHub possui integração nativa com a Imobitech, uma pagadoria especializada em 
                split de pagamentos para o mercado imobiliário. Com essa integração:
              </p>
              <ul>
                <li>As comissões calculadas são enviadas automaticamente para pagamento</li>
                <li>Cada envolvido recebe sua parte diretamente na conta</li>
                <li>A imobiliária mantém controle total sobre os pagamentos</li>
                <li>Tudo fica documentado e rastreável</li>
              </ul>

              <h2>Conclusão</h2>
              <p>
                Uma gestão de comissões eficiente não é apenas sobre pagar certo – é sobre criar 
                um ambiente de confiança e transparência que motiva sua equipe a vender mais.
              </p>
              <p>
                Quer simplificar a gestão de comissões da sua imobiliária? 
                <Link to="https://calendly.com/artur-terprise/30min" target="_blank"> Agende uma demonstração</Link> do 
                Portal de Vendas do ImobHub.
              </p>
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
