import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    slug: "crm-imobiliario",
    title: "Como aumentar suas vendas com um CRM imobiliário eficiente",
    excerpt: "Descubra as melhores práticas para utilizar um CRM e converter mais leads em vendas.",
    category: "Vendas",
    date: "Janeiro 2025",
    readTime: "5 min",
  },
  {
    id: 2,
    slug: "integracao-portais",
    title: "A importância da integração com portais imobiliários",
    excerpt: "Entenda como a publicação automática em portais pode economizar tempo e aumentar sua visibilidade.",
    category: "Marketing",
    date: "Janeiro 2025",
    readTime: "4 min",
  },
  {
    id: 3,
    slug: "gestao-comissoes",
    title: "Gestão de comissões: como organizar os pagamentos da sua equipe",
    excerpt: "Dicas práticas para gerenciar comissões de corretores de forma transparente e eficiente.",
    category: "Gestão",
    date: "Janeiro 2025",
    readTime: "6 min",
  },
  {
    id: 4,
    slug: "assinatura-digital",
    title: "Assinatura digital: agilize seus contratos imobiliários",
    excerpt: "Conheça os benefícios de utilizar assinatura digital e como implementar na sua imobiliária.",
    category: "Tecnologia",
    date: "Janeiro 2025",
    readTime: "5 min",
  },
  {
    id: 5,
    slug: "whatsapp-imobiliarias",
    title: "WhatsApp para imobiliárias: melhores práticas de atendimento",
    excerpt: "Aprenda a utilizar o WhatsApp de forma profissional para atender e converter leads.",
    category: "Atendimento",
    date: "Janeiro 2025",
    readTime: "7 min",
  },
  {
    id: 6,
    slug: "site-imobiliario",
    title: "Como criar um site imobiliário que converte",
    excerpt: "Os elementos essenciais para um site de imobiliária de alta performance.",
    category: "Marketing",
    date: "Janeiro 2025",
    readTime: "8 min",
  },
];

export default function Blog() {
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
                Blog
              </span>
              <h1 className="heading-section mb-6">
                Conteúdo para
                <br />
                <span className="text-gradient">impulsionar seu negócio</span>
              </h1>
              <p className="text-body-large">
                Dicas, tutoriais e novidades sobre gestão imobiliária, 
                vendas e tecnologia para o mercado imobiliário.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-300 group"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <span className="px-3 py-1 bg-accent/20 rounded-full text-sm text-accent font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center text-sm text-accent font-medium group-hover:gap-2 transition-all">
                        Ler artigo
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
