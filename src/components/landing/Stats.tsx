import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "80+",
    label: "Clientes Ativos",
    description: "Confiam em nossas soluções diariamente",
  },
  {
    value: "<3%",
    label: "Taxa de Churn",
    description: "Reflexo de um produto sólido",
  },
  {
    value: "<2h",
    label: "Tempo de Resposta",
    description: "Suporte técnico ágil e eficiente",
  },
  {
    value: "100%",
    label: "Integrado",
    description: "Ecossistema unificado e completo",
  },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-dark-gradient text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-6">
              Desenhado por quem entende.
              <br />
              <span className="text-accent">Feito para quem usa.</span>
            </h2>
            <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
              Nossos sistemas não são feitos "para" o mercado, 
              são feitos "com" o mercado.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm"
              >
                <div className="text-5xl md:text-6xl font-extrabold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-primary-foreground/60">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Differentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20 grid md:grid-cols-2 gap-8"
          >
            <div className="p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Co-criação com o Mercado
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                As funções foram pensadas para se adequar aos processos reais 
                e individuais de cada empresa. Ouvimos os grandes players para 
                construir algo que realmente funciona.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Suporte Rápido e Eficiente
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                Chega de esperar dias por uma resposta. Nosso suporte técnico 
                é ágil e resolve seus problemas, permitindo que sua equipe 
                continue produtiva.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
