import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default function Termos() {
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
              <h1 className="text-4xl font-bold mb-4">Termos de Uso</h1>
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
              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o ImobHub, você concorda em cumprir e estar vinculado 
                a estes Termos de Uso. Se você não concordar com qualquer parte destes 
                termos, não deve usar nossos serviços.
              </p>

              <h2>2. Descrição do Serviço</h2>
              <p>
                O ImobHub é uma plataforma de gestão imobiliária que oferece ferramentas 
                de CRM, portal de vendas, integrações com portais imobiliários e outras 
                funcionalidades para imobiliárias e corretores de imóveis.
              </p>

              <h2>3. Registro e Conta</h2>
              <p>
                Para usar nossos serviços, você deve criar uma conta fornecendo 
                informações precisas e completas. Você é responsável por manter 
                a confidencialidade de sua conta e senha.
              </p>

              <h2>4. Uso Permitido</h2>
              <p>Você concorda em usar o ImobHub apenas para fins legítimos e de acordo com:</p>
              <ul>
                <li>Todas as leis e regulamentos aplicáveis</li>
                <li>As diretrizes e políticas do ImobHub</li>
                <li>Os direitos de terceiros</li>
              </ul>

              <h2>5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo, recursos e funcionalidades do ImobHub são de 
                propriedade exclusiva da Terprise Soluções Digitais e são protegidos 
                por leis de propriedade intelectual.
              </p>

              <h2>6. Dados e Privacidade</h2>
              <p>
                O uso de seus dados pessoais é regido por nossa Política de 
                Privacidade. Ao usar o ImobHub, você concorda com a coleta e 
                uso de informações de acordo com essa política.
              </p>

              <h2>7. Pagamento e Assinatura</h2>
              <p>
                Os termos de pagamento e assinatura serão definidos no momento 
                da contratação. Valores e condições podem variar de acordo com 
                o plano escolhido.
              </p>

              <h2>8. Limitação de Responsabilidade</h2>
              <p>
                O ImobHub é fornecido "como está" e não garantimos que o serviço 
                será ininterrupto ou livre de erros. Não nos responsabilizamos 
                por danos indiretos, incidentais ou consequenciais.
              </p>

              <h2>9. Rescisão</h2>
              <p>
                Podemos suspender ou encerrar seu acesso ao ImobHub a qualquer 
                momento, por qualquer motivo, incluindo violação destes termos.
              </p>

              <h2>10. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão comunicadas por email ou através 
                da plataforma.
              </p>

              <h2>11. Contato</h2>
              <p>
                Para questões sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <ul>
                <li>Email: contato@terprise.com.br</li>
                <li>WhatsApp: (62) 99461-6268</li>
              </ul>

              <h2>12. Lei Aplicável</h2>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil. 
                Qualquer disputa será resolvida nos tribunais de Goiânia, GO.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
