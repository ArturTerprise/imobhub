import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function SiteImobiliario() {
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
                Como criar um site imobiliário que converte
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
                  8 min de leitura
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
                Seu site é a vitrine digital da sua imobiliária. Um site bem construído não 
                apenas apresenta seus imóveis – ele converte visitantes em leads qualificados.
              </p>

              <h2>Por que ter um site próprio?</h2>
              <p>
                Muitas imobiliárias dependem exclusivamente de portais imobiliários. Isso é um erro. 
                Ter um site próprio oferece:
              </p>
              <ul>
                <li><strong>Marca:</strong> Constrói autoridade e reconhecimento</li>
                <li><strong>Controle:</strong> Você define as regras, não o portal</li>
                <li><strong>SEO:</strong> Apareça no Google para buscas locais</li>
                <li><strong>Leads qualificados:</strong> Quem busca sua imobiliária já te conhece</li>
                <li><strong>Menor custo por lead:</strong> Sem pagar por cada clique</li>
              </ul>

              <h2>Elementos essenciais de um site que converte</h2>

              <h3>1. Busca de imóveis intuitiva</h3>
              <p>
                O visitante precisa encontrar o que procura em segundos. Ofereça:
              </p>
              <ul>
                <li>Filtros por localização, tipo, preço, quartos</li>
                <li>Busca por mapa</li>
                <li>Resultados rápidos e relevantes</li>
                <li>Salvamento de buscas favoritas</li>
              </ul>

              <h3>2. Páginas de imóveis completas</h3>
              <p>
                Cada imóvel merece uma página que venda. Inclua:
              </p>
              <ul>
                <li>Fotos de alta qualidade (mínimo 15-20 por imóvel)</li>
                <li>Tour virtual ou vídeo quando possível</li>
                <li>Descrição detalhada e envolvente</li>
                <li>Lista de características e diferenciais</li>
                <li>Localização no mapa (sem endereço exato)</li>
                <li>Informações do bairro</li>
                <li>Botão de contato visível e acessível</li>
              </ul>

              <h3>3. CTAs (Chamadas para ação) claras</h3>
              <p>
                O visitante precisa saber o próximo passo. Em cada página, tenha:
              </p>
              <ul>
                <li>Botão de WhatsApp flutuante</li>
                <li>"Agendar visita" em destaque</li>
                <li>"Falar com corretor" sempre visível</li>
                <li>Formulário de contato simples (poucos campos)</li>
              </ul>

              <h3>4. Mobile first</h3>
              <p>
                Mais de 70% das buscas por imóveis são feitas pelo celular. Seu site precisa:
              </p>
              <ul>
                <li>Carregar rápido em conexões móveis</li>
                <li>Ter botões grandes e fáceis de clicar</li>
                <li>Exibir fotos otimizadas para telas menores</li>
                <li>Funcionar perfeitamente em todos os dispositivos</li>
              </ul>

              <h3>5. SEO local</h3>
              <p>
                Aparecer no Google para "imobiliária em [sua cidade]" é ouro. Invista em:
              </p>
              <ul>
                <li>Páginas para cada bairro que você atua</li>
                <li>Blog com conteúdo relevante sobre a região</li>
                <li>Google Meu Negócio otimizado</li>
                <li>Palavras-chave locais em todo o site</li>
              </ul>

              <h2>Erros que matam conversões</h2>

              <h3>Site lento</h3>
              <p>
                Cada segundo de carregamento reduz conversões em até 7%. Otimize imagens, 
                use hospedagem de qualidade.
              </p>

              <h3>Formulários longos</h3>
              <p>
                Ninguém quer preencher 10 campos para fazer uma pergunta. Nome, telefone e 
                email são suficientes para o primeiro contato.
              </p>

              <h3>Falta de fotos</h3>
              <p>
                Imóvel com poucas fotos ou fotos ruins simplesmente não gera interesse. 
                Invista em fotografia profissional.
              </p>

              <h3>Informações desatualizadas</h3>
              <p>
                Imóveis vendidos ainda no site, preços errados, telefones que não atendem. 
                Isso destrói credibilidade.
              </p>

              <h2>Site integrado ao ImobHub</h2>
              <p>
                O ImobHub oferece um site imobiliário completamente integrado ao CRM:
              </p>
              <ul>
                <li><strong>Sincronização automática:</strong> Imóveis cadastrados no CRM aparecem no site instantaneamente</li>
                <li><strong>Leads direto no CRM:</strong> Contatos do site vão direto para o funil</li>
                <li><strong>Design profissional:</strong> Templates modernos e responsivos</li>
                <li><strong>SEO otimizado:</strong> Estrutura preparada para ranquear</li>
                <li><strong>WhatsApp integrado:</strong> Botão flutuante em todas as páginas</li>
                <li><strong>Analytics:</strong> Acompanhe visitas e conversões</li>
              </ul>

              <h2>Conclusão</h2>
              <p>
                Um site imobiliário não é um custo – é um investimento. Um bom site trabalha 
                para você 24 horas por dia, atraindo e convertendo leads mesmo enquanto você dorme.
              </p>
              <p>
                Quer um site integrado ao seu CRM? 
                <Link to="https://calendly.com/artur-terprise/30min" target="_blank"> Agende uma demonstração</Link> e 
                conheça o site imobiliário do ImobHub.
              </p>
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
