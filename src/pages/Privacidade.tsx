import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default function Privacidade() {
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
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
              <p className="text-muted-foreground">
                Última atualização: Janeiro de 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert"
            >
              <h2>1. Introdução</h2>
              <p>
                A Terprise Soluções Digitais ("nós", "nosso" ou "ImobHub") está 
                comprometida em proteger sua privacidade. Esta política descreve 
                como coletamos, usamos e protegemos suas informações pessoais.
              </p>

              <h2>2. Informações que Coletamos</h2>
              <p>Podemos coletar os seguintes tipos de informações:</p>
              <ul>
                <li><strong>Dados de cadastro:</strong> nome, email, telefone, CPF/CNPJ</li>
                <li><strong>Dados da empresa:</strong> nome da imobiliária, CRECI, endereço</li>
                <li><strong>Dados de uso:</strong> logs de acesso, ações na plataforma</li>
                <li><strong>Dados de clientes:</strong> informações de leads e clientes cadastrados por você</li>
              </ul>

              <h2>3. Como Usamos suas Informações</h2>
              <p>Utilizamos suas informações para:</p>
              <ul>
                <li>Fornecer e manter nossos serviços</li>
                <li>Processar pagamentos e assinaturas</li>
                <li>Enviar comunicações sobre o serviço</li>
                <li>Melhorar nossos produtos e suporte</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h2>4. Compartilhamento de Dados</h2>
              <p>
                Não vendemos suas informações pessoais. Podemos compartilhar dados com:
              </p>
              <ul>
                <li>Parceiros de integração (portais, assinadores) quando você autoriza</li>
                <li>Prestadores de serviço essenciais (hospedagem, pagamentos)</li>
                <li>Autoridades, quando exigido por lei</li>
              </ul>

              <h2>5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas técnicas e organizacionais para proteger 
                suas informações, incluindo:
              </p>
              <ul>
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares</li>
              </ul>

              <h2>6. Seus Direitos (LGPD)</h2>
              <p>De acordo com a Lei Geral de Proteção de Dados, você tem direito a:</p>
              <ul>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou incorretos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar consentimento</li>
                <li>Portabilidade de dados</li>
              </ul>

              <h2>7. Cookies e Tecnologias Similares</h2>
              <p>
                Utilizamos cookies para melhorar sua experiência, lembrar suas 
                preferências e analisar o uso da plataforma. Você pode gerenciar 
                cookies através das configurações do seu navegador.
              </p>

              <h2>8. Retenção de Dados</h2>
              <p>
                Mantemos seus dados enquanto sua conta estiver ativa ou conforme 
                necessário para fornecer os serviços. Após encerramento da conta, 
                mantemos dados por período exigido por lei.
              </p>

              <h2>9. Menores de Idade</h2>
              <p>
                O ImobHub não é destinado a menores de 18 anos. Não coletamos 
                intencionalmente dados de menores.
              </p>

              <h2>10. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos 
                sobre alterações significativas por email ou através da plataforma.
              </p>

              <h2>11. Contato do Encarregado (DPO)</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
              </p>
              <ul>
                <li>Email: contato@terprise.com.br</li>
                <li>WhatsApp: (62) 99461-6268</li>
                <li>Endereço: Goiânia, GO - Brasil</li>
              </ul>

              <h2>12. Autoridade Supervisora</h2>
              <p>
                Caso entenda que seus direitos não foram atendidos, você pode 
                apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
