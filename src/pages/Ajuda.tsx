import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Search, Book, MessageCircle, Video, FileText, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const WHATSAPP_LINK = "https://wa.me/5562994616268?text=Olá! Preciso de ajuda com o ImobHub.";

const categories = [
  {
    icon: Book,
    title: "Primeiros Passos",
    description: "Aprenda a configurar e começar a usar o ImobHub",
    articles: [
      "Como criar sua conta",
      "Configuração inicial do sistema",
      "Importação de dados",
      "Personalização do seu perfil",
    ],
  },
  {
    icon: MessageCircle,
    title: "CRM & Leads",
    description: "Gerencie seus leads e clientes de forma eficiente",
    articles: [
      "Cadastro de leads",
      "Fila de distribuição",
      "Funil de vendas",
      "Automações de follow-up",
    ],
  },
  {
    icon: FileText,
    title: "Portal de Vendas",
    description: "Organize suas vendas e contratos",
    articles: [
      "Registro de vendas",
      "Gestão de contratos",
      "Comissionamento",
      "Relatórios de vendas",
    ],
  },
  {
    icon: Video,
    title: "Integrações",
    description: "Configure suas integrações com portais e ferramentas",
    articles: [
      "Integração com portais",
      "WhatsApp Business",
      "Assinatura digital",
      "Imobitech (pagadoria)",
    ],
  },
];

const faqs = [
  {
    question: "O CRM já integra nativamente com os portais imobiliários?",
    answer: "Sim! O ImobHub possui integração nativa de mão dupla com os principais portais (Canal Pro, Chaves na Mão, 62 Imóveis, Imóvel Web). Isso significa que seus imóveis são publicados automaticamente E os leads que chegam pelos portais entram direto no CRM, prontos para distribuição.",
  },
  {
    question: "O sistema gera contratos automaticamente preenchidos e integra com Imobitech?",
    answer: "Sim! O ImobHub gera contratos automaticamente preenchidos com os dados do cliente, imóvel e condições da venda. Além disso, temos integração nativa com a Imobitech para split automático de pagamentos de comissões.",
  },
  {
    question: "Posso integrar com meu site atual?",
    answer: "Sim! O ImobHub oferece integração via API com seu site atual ou você pode utilizar nosso site integrado.",
  },
  {
    question: "Qual o prazo de resposta do suporte?",
    answer: "Nosso suporte é técnico de verdade – pessoas reais que entendem do mercado imobiliário. Respondemos rapidamente durante o horário comercial (seg-sex, 8h-18h).",
  },
];

export default function Ajuda() {
  const [searchQuery, setSearchQuery] = useState("");

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
                Central de Ajuda
              </span>
              <h1 className="heading-section mb-6">
                Como podemos
                <br />
                <span className="text-gradient">ajudar você?</span>
              </h1>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar artigos de ajuda..."
                  className="pl-12 py-6 text-base rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Categorias de Ajuda</h2>
              <p className="text-muted-foreground">
                Encontre respostas organizadas por tema
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article}>
                        <span className="text-sm text-muted-foreground hover:text-accent cursor-pointer transition-colors">
                          • {article}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 bg-accent/10 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-3">Não encontrou o que procura?</h3>
              <p className="text-muted-foreground mb-6">
                Nossa equipe de suporte técnico está pronta para ajudar você pelo WhatsApp.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Falar com suporte
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
