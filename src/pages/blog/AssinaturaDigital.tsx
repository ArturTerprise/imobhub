import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function AssinaturaDigital() {
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
                Tecnologia
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Assinatura digital: agilize seus contratos imobiliários
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
                Contratos em papel, reconhecimento de firma em cartório, deslocamentos... 
                Esse cenário está ficando no passado. A assinatura digital veio para revolucionar 
                o fechamento de negócios imobiliários.
              </p>

              <h2>O que é assinatura digital?</h2>
              <p>
                Assinatura digital é uma forma de validar documentos eletronicamente com a mesma 
                validade jurídica de uma assinatura física com firma reconhecida. No Brasil, ela é 
                regulamentada pela Medida Provisória 2.200-2/2001 e pela Lei 14.063/2020.
              </p>

              <h2>Benefícios para o mercado imobiliário</h2>

              <h3>1. Agilidade no fechamento</h3>
              <p>
                Sem necessidade de encontros presenciais ou idas ao cartório, um contrato pode ser 
                assinado em minutos. Isso é especialmente útil quando as partes estão em cidades 
                diferentes.
              </p>

              <h3>2. Redução de custos</h3>
              <p>
                Elimine gastos com impressão, autenticação em cartório, motoboy e armazenamento 
                físico de documentos.
              </p>

              <h3>3. Segurança jurídica</h3>
              <p>
                As plataformas de assinatura digital utilizam tecnologias avançadas de criptografia 
                e geram trilhas de auditoria completas, garantindo a integridade do documento.
              </p>

              <h3>4. Organização</h3>
              <p>
                Todos os contratos ficam armazenados digitalmente, com fácil busca e acesso. 
                Nada de gavetas cheias de papel.
              </p>

              <h2>Tipos de documentos que podem ser assinados</h2>
              <ul>
                <li>Contratos de compra e venda</li>
                <li>Contratos de locação</li>
                <li>Propostas de negociação</li>
                <li>Procurações</li>
                <li>Termos de vistoria</li>
                <li>Aditivos contratuais</li>
                <li>Distrato</li>
              </ul>

              <h2>Plataformas integradas ao ImobHub</h2>
              <p>
                O ImobHub oferece integração nativa com as principais plataformas de assinatura 
                digital do mercado:
              </p>

              <h3>Autentique</h3>
              <p>
                Plataforma brasileira com excelente custo-benefício, ideal para imobiliárias que 
                estão começando com assinatura digital. Oferece planos por documento ou assinaturas 
                mensais.
              </p>

              <h3>DocuSign</h3>
              <p>
                Líder mundial em assinatura eletrônica, com reconhecimento internacional. 
                Ideal para imobiliárias que trabalham com clientes estrangeiros ou grandes corporações.
              </p>

              <h3>D4Sign</h3>
              <p>
                Plataforma robusta com foco no mercado brasileiro, oferece diferentes níveis de 
                autenticação e integração com certificados digitais ICP-Brasil.
              </p>

              <h2>Como funciona a integração</h2>
              <p>
                Com o ImobHub, o fluxo de assinatura digital é simples:
              </p>
              <ol>
                <li>Gere o contrato a partir do sistema, usando os dados já cadastrados</li>
                <li>Envie para assinatura com um clique</li>
                <li>Acompanhe o status em tempo real</li>
                <li>Receba o documento assinado automaticamente no sistema</li>
              </ol>

              <h2>Validade jurídica</h2>
              <p>
                É comum ter dúvidas sobre a validade de contratos assinados digitalmente. 
                A legislação brasileira é clara:
              </p>
              <ul>
                <li>A MP 2.200-2/2001 instituiu a ICP-Brasil e validou assinaturas digitais</li>
                <li>A Lei 14.063/2020 reconhece três tipos de assinatura eletrônica</li>
                <li>O Código Civil aceita qualquer meio de prova admitido em Direito</li>
              </ul>
              <p>
                Na prática, milhões de contratos são assinados digitalmente todos os dias no 
                Brasil, incluindo os de grandes transações imobiliárias.
              </p>

              <h2>Conclusão</h2>
              <p>
                A assinatura digital não é mais futuro – é presente. Imobiliárias que ainda não 
                adotaram essa tecnologia estão perdendo em agilidade, custos e experiência do cliente.
              </p>
              <p>
                Quer implementar assinatura digital na sua imobiliária? 
                <Link to="https://calendly.com/artur-terprise/30min" target="_blank"> Agende uma demonstração</Link> e 
                veja como o ImobHub pode ajudar.
              </p>
            </motion.article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
