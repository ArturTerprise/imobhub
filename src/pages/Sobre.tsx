import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Foco no Cliente",
    description: "Desenvolvemos soluções pensando nas necessidades reais das imobiliárias.",
  },
  {
    icon: Lightbulb,
    title: "Inovação Contínua",
    description: "Buscamos constantemente novas tecnologias para melhorar nossos produtos.",
  },
  {
    icon: Heart,
    title: "Compromisso",
    description: "Nos dedicamos 100% ao sucesso de cada cliente que confia em nós.",
  },
  {
    icon: Users,
    title: "Parceria",
    description: "Trabalhamos lado a lado com nossos clientes para alcançar resultados.",
  },
];

export default function Sobre() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-hero-gradient">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full">
                Sobre Nós
              </span>
              <h1 className="heading-section mb-6">
                Transformando o mercado
                <br />
                <span className="text-gradient">imobiliário brasileiro</span>
              </h1>
              <p className="text-body-large">
                Somos a Terprise Soluções Digitais, empresa especializada em 
                tecnologia para o mercado imobiliário. Nosso objetivo é simplificar 
                a gestão de imobiliárias através de soluções inovadoras.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
                <p className="text-muted-foreground mb-4">
                  O ImobHub nasceu da observação das dificuldades enfrentadas por 
                  imobiliárias no dia a dia: sistemas fragmentados, processos manuais 
                  e falta de integração entre ferramentas.
                </p>
                <p className="text-muted-foreground mb-4">
                  Com experiência no mercado imobiliário goiano, identificamos a 
                  oportunidade de criar um ecossistema completo que unifica CRM, 
                  site, portal de vendas e automações em uma única plataforma.
                </p>
                <p className="text-muted-foreground">
                  Hoje, atendemos mais de 80 imobiliárias em todo o Brasil, com 
                  uma taxa de satisfação superior a 97%.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-accent/10 rounded-2xl p-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-accent">+80</span>
                    <p className="text-sm text-muted-foreground mt-1">Clientes ativos</p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-accent">97%</span>
                    <p className="text-sm text-muted-foreground mt-1">Satisfação</p>
                  </div>
                  <div className="text-center col-span-2">
                    <span className="text-2xl font-bold text-accent">Suporte técnico de verdade</span>
                    <p className="text-sm text-muted-foreground mt-1">Pessoas reais que entendem do mercado</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Os princípios que guiam tudo o que fazemos.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
