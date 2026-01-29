import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Briefcase, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  "Trabalho 100% remoto",
  "Ambiente colaborativo e inovador",
  "Oportunidade de crescimento",
  "Tecnologias modernas",
  "Equipe jovem e dinâmica",
  "Projetos desafiadores",
];

export default function Carreiras() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    area: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula envio do email
    const mailtoLink = `mailto:contato@terprise.com.br?subject=Candidatura - ${formData.area || "Geral"}&body=Nome: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ATelefone: ${formData.phone}%0D%0ALinkedIn: ${formData.linkedin}%0D%0AÁrea de interesse: ${formData.area}%0D%0A%0D%0AMensagem:%0D%0A${formData.message}`;
    
    window.open(mailtoLink, "_blank");

    toast({
      title: "Redirecionando para seu email!",
      description: "Complete o envio da sua candidatura pelo seu cliente de email.",
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
                Carreiras
              </span>
              <h1 className="heading-section mb-6">
                Faça parte do
                <br />
                <span className="text-gradient">time ImobHub</span>
              </h1>
              <p className="text-body-large">
                Estamos sempre em busca de talentos apaixonados por tecnologia 
                e inovação. Venha construir o futuro do mercado imobiliário conosco!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Por que trabalhar conosco?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Oferecemos um ambiente de trabalho que valoriza a criatividade, 
                autonomia e desenvolvimento profissional.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Envie sua candidatura</h3>
                  <p className="text-muted-foreground">
                    Mesmo sem vagas abertas no momento, cadastre-se em nosso banco de talentos.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo *</Label>
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
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/seuperfil"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Área de interesse</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="Ex: Desenvolvimento, Marketing, Suporte..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Por que quer trabalhar conosco? *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Conte um pouco sobre você, suas experiências e por que gostaria de fazer parte do time..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn-accent w-full py-6 h-auto rounded-full"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Enviando..." : "Enviar candidatura"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Ao enviar, você será redirecionado para seu cliente de email 
                    para completar o envio para contato@terprise.com.br
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
