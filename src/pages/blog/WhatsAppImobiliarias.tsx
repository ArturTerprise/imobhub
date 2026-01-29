import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhatsAppImobiliarias() {
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
                Atendimento
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                WhatsApp para imobiliárias: melhores práticas de atendimento
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
                  7 min de leitura
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
                O WhatsApp é o canal preferido dos brasileiros para comunicação. Para imobiliárias, 
                dominar o atendimento por WhatsApp pode ser a diferença entre conquistar ou perder clientes.
              </p>

              <h2>Por que o WhatsApp é essencial?</h2>
              <p>
                Dados mostram que mais de 96% dos smartphones no Brasil têm WhatsApp instalado. 
                Seus clientes estão lá, e eles preferem ser atendidos por lá. Não adianta resistir.
              </p>
              <p>
                Além disso, o WhatsApp oferece:
              </p>
              <ul>
                <li>Comunicação instantânea e direta</li>
                <li>Possibilidade de enviar fotos, vídeos e documentos</li>
                <li>Áudios para explicações mais complexas</li>
                <li>Localização para facilitar visitas</li>
                <li>Alto índice de abertura de mensagens (muito superior ao email)</li>
              </ul>

              <h2>Melhores práticas de atendimento</h2>

              <h3>1. Velocidade de resposta</h3>
              <p>
                Lead frio é lead perdido. Estudos mostram que a chance de contato cai drasticamente 
                após os primeiros 5 minutos. Tenha um sistema que notifique imediatamente quando 
                um novo lead chega.
              </p>

              <h3>2. Personalize o atendimento</h3>
              <p>
                Use o nome do cliente, referencie o imóvel que ele demonstrou interesse. 
                Nada de mensagens genéricas que parecem spam.
              </p>

              <h3>3. Seja profissional</h3>
              <p>
                WhatsApp é informal, mas profissionalismo é fundamental:
              </p>
              <ul>
                <li>Use foto de perfil profissional</li>
                <li>Escreva corretamente (nada de "vc", "td bem")</li>
                <li>Evite áudios muito longos</li>
                <li>Respeite horários comerciais</li>
              </ul>

              <h3>4. Envie conteúdo relevante</h3>
              <p>
                Antes de bombardear com fotos, entenda a necessidade do cliente. Envie imóveis 
                que realmente façam sentido para o perfil dele.
              </p>

              <h3>5. Facilite a visita</h3>
              <p>
                Use a função de localização para enviar o endereço, proponha horários específicos 
                (não pergunte "quando você pode"), e confirme no dia.
              </p>

              <h2>Distribuição de leads via WhatsApp</h2>
              <p>
                Um dos maiores diferenciais do ImobHub é a distribuição de leads diretamente 
                no WhatsApp dos corretores. Funciona assim:
              </p>
              <ol>
                <li>Lead chega no sistema (portal, site, Facebook)</li>
                <li>Sistema identifica o perfil do lead (região, tipo de imóvel, preço)</li>
                <li>Lead é distribuído automaticamente para o corretor mais adequado</li>
                <li>Corretor recebe no WhatsApp com todas as informações</li>
                <li>Corretor pode responder diretamente pelo WhatsApp</li>
              </ol>

              <h2>Filtros exclusivos do ImobHub</h2>
              <p>
                A distribuição de leads do ImobHub oferece filtros que você não encontra em 
                nenhum outro sistema:
              </p>
              <ul>
                <li><strong>Por região:</strong> Leads de determinada área vão para corretores especializados</li>
                <li><strong>Por tipo de imóvel:</strong> Apartamentos para quem entende de vertical, casas para quem domina horizontal</li>
                <li><strong>Por faixa de preço:</strong> Corretores de alto padrão recebem leads de alto padrão</li>
                <li><strong>Por origem:</strong> Leads de cada portal podem ter destinos diferentes</li>
                <li><strong>Por disponibilidade:</strong> Respeita a agenda e status do corretor</li>
                <li><strong>Rodízio justo:</strong> Distribui igualmente entre a equipe</li>
              </ul>

              <h2>Erros comuns a evitar</h2>
              <ul>
                <li><strong>Demorar para responder:</strong> Cada minuto conta</li>
                <li><strong>Mensagens genéricas:</strong> "Oi, tudo bem?" sem contexto</li>
                <li><strong>Excesso de mensagens:</strong> Não seja invasivo</li>
                <li><strong>Não registrar conversas:</strong> Tudo deve estar no CRM</li>
                <li><strong>Falta de follow-up:</strong> Não desista após a primeira tentativa</li>
              </ul>

              <h2>Conclusão</h2>
              <p>
                O WhatsApp é uma ferramenta poderosa, mas precisa ser usado com estratégia. 
                Combine boas práticas de atendimento com tecnologia de distribuição inteligente 
                e veja seus resultados melhorarem.
              </p>
              <p>
                Quer conhecer a distribuição de leads do ImobHub? 
                <Link to="https://calendly.com/artur-terprise/30min" target="_blank"> Agende uma demonstração</Link> e 
                veja como funciona na prática.
              </p>
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
