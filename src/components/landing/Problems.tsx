import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  AlertTriangle, 
  Clock, 
  Unplug, 
  Users, 
  FileX, 
  HeadphonesIcon,
  Settings 
} from "lucide-react";

const problems = [
  {
    icon: FileX,
    text: "Sites desatualizados ou não integrados a CRMs e portais",
  },
  {
    icon: Unplug,
    text: "Múltiplos sistemas que não conversam entre si",
  },
  {
    icon: Clock,
    text: "Distribuição de leads lenta e manual, esfriando o cliente",
  },
  {
    icon: Settings,
    text: "Processos manuais repetitivos, como retirada de certidões",
  },
  {
    icon: HeadphonesIcon,
    text: "Sistemas complexos com suporte lento ou inexistente",
  },
  {
    icon: Users,
    text: "Falta de controle centralizado da secretaria de vendas",
  },
];

export function Problems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom">
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full">
              O mercado mudou
            </span>
            <h2 className="heading-section mb-6">
              Seus sistemas{" "}
              <span className="text-muted-foreground">acompanharam?</span>
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
              Empresas do ramo imobiliário perdem vendas todos os dias por dependerem 
              de processos manuais, sistemas lentos e falta de integração.
            </p>
          </motion.div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex items-start gap-4 p-6 rounded-xl bg-destructive/5 border border-destructive/10 group hover:bg-destructive/10 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                  <problem.icon className="w-5 h-5" />
                </div>
                <p className="text-foreground/80 font-medium leading-relaxed">
                  {problem.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
