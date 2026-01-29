import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_LINK = "https://wa.me/5562994616268?text=Olá! Gostaria de falar com a equipe ImobHub.";

const contactInfo = [
  {
    icon: Phone,
    title: "WhatsApp",
    value: "(62) 99461-6268",
    link: WHATSAPP_LINK,
  },
  {
    icon: Mail,
    title: "Email",
    value: "contato@terprise.com.br",
    link: "mailto:contato@terprise.com.br",
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    value: "Seg-Sex, 8h às 18h",
    link: null,
  },
  {
    icon: MapPin,
    title: "Localização",
    value: "Goiânia, GO - Brasil",
    link: null,
  },
];

export default function Contato() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mailtoLink = `mailto:contato@terprise.com.br?subject=${formData.subject || "Contato via site"}&body=Nome: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ATelefone: ${formData.phone}%0D%0AEmpresa: ${formData.company}%0D%0A%0D%0AMensagem:%0D%0A${formData.message}`;
    
    window.open(mailtoLink, "_blank");

    toast({
      title: "Redirecionando para seu email!",
      description: "Complete o envio da mensagem pelo seu cliente de email.",
    });

    setIsSubmitting(false);
  };

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
                Contato
              </span>
              <h1 className="heading-section mb-6">
                Fale com a
                <br />
                <span className="text-gradient">nossa equipe</span>
              </h1>
              <p className="text-body-large">
                Tem dúvidas sobre o ImobHub? Quer saber como podemos ajudar sua 
                imobiliária? Entre em contato conosco!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.title}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-accent transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-accent/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-3">Prefere WhatsApp?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Resposta rápida em até 2 horas durante horário comercial.
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent/90 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Iniciar conversa
                  </a>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <h3 className="text-xl font-bold mb-6">Envie sua mensagem</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nome da sua imobiliária"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Ex: Dúvidas sobre planos, suporte técnico..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Como podemos ajudar?"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="btn-accent w-full py-6 h-auto rounded-full"
                      disabled={isSubmitting}
                    >
                      <Send className="w-5 h-5" />
                      {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
