import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  UserPlus,
  Search,
  List,
  ArrowRightLeft,
  StickyNote,
  CalendarPlus,
  MessageSquarePlus,
  CheckSquare,
  CalendarClock,
  AlertCircle,
  Eye,
  BarChart2,
  GitCompareArrows,
  UserCheck,
  Building,
  FileDown,
  Landmark,
  ListOrdered,
  PenLine,
  Sparkles,
  Bot,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY_LINK = "https://calendly.com/artur-terprise/30min";

const agentFeatures = [
  {
    icon: UserPlus,
    title: "Criar lead",
    description: "Cadastra novo lead no CRM já atribuído ao corretor, com nome, telefone, e-mail e origem.",
  },
  {
    icon: Search,
    title: "Buscar lead",
    description: "Localiza qualquer lead por código, nome ou telefone do cliente.",
  },
  {
    icon: List,
    title: "Listar meus leads",
    description: "Filtra e lista leads por status, data ou período. \"Meus leads em visita agendada\" ou \"leads de hoje\".",
  },
  {
    icon: ArrowRightLeft,
    title: "Mover status",
    description: "Avança ou retrocede um lead no funil de vendas com um único comando.",
  },
  {
    icon: StickyNote,
    title: "Adicionar nota",
    description: "Registra uma anotação em qualquer lead instantaneamente.",
  },
  {
    icon: CalendarPlus,
    title: "Criar atividade",
    description: "Agenda tarefas com interpretação de datas relativas: \"amanhã às 10h\", \"sexta\".",
  },
  {
    icon: MessageSquarePlus,
    title: "Registrar interação",
    description: "Um comando só: cria nota sobre o que aconteceu e já agenda a próxima atividade.",
  },
  {
    icon: CheckSquare,
    title: "Concluir atividade",
    description: "Marca tarefas como concluídas por linguagem natural: \"concluí a ligação\", \"visita realizada\".",
  },
  {
    icon: CalendarClock,
    title: "Atividades de hoje",
    description: "Lista tudo que vence no dia para o corretor não perder nenhum follow-up.",
  },
  {
    icon: AlertCircle,
    title: "Atividades atrasadas",
    description: "Mostra tarefas vencidas que precisam de atenção imediata.",
  },
  {
    icon: Eye,
    title: "Ver lead completo",
    description: "Exibe todos os detalhes, histórico e atividades de um lead em segundos.",
  },
  {
    icon: BarChart2,
    title: "Ver dashboard",
    description: "KPIs gerais: total de leads, taxa de conversão, top corretores, leads por status.",
  },
  {
    icon: GitCompareArrows,
    title: "Comparar performance",
    description: "Compara períodos ou corretores: \"equipe esse mês vs mês passado\", \"minha performance vs média\".",
  },
  {
    icon: UserCheck,
    title: "Transferir lead",
    description: "Transfere lead para outro corretor. Disponível para gerentes e admins.",
  },
  {
    icon: Building,
    title: "Buscar imóvel",
    description: "Localiza imóveis e captações no banco de dados da imobiliária.",
  },
  {
    icon: FileDown,
    title: "Gerar PDF do imóvel",
    description: "Cria e envia o link do material de apresentação do imóvel direto para o cliente.",
  },
  {
    icon: Landmark,
    title: "Buscar incorporadora",
    description: "Recupera contatos de construtoras e incorporadoras cadastradas no sistema.",
  },
  {
    icon: ListOrdered,
    title: "Posição na fila",
    description: "Mostra a posição atual do corretor na fila de distribuição de leads.",
  },
  {
    icon: PenLine,
    title: "Gerar mensagem para proprietário",
    description: "Cria texto profissional para enviar ao dono do imóvel com base no relato do corretor.",
  },
];

const chatExamples = [
  { from: "user", text: "Cria um lead: João Silva, (62) 99999-8888, interessado no Apto 302" },
  { from: "bot", text: "✅ Lead criado e atribuído a você. João Silva está em Novo contato. Quer já criar uma atividade de boas-vindas?" },
  { from: "user", text: "Meus leads com visita agendada pra hoje" },
  { from: "bot", text: "📋 Você tem 3 visitas hoje:\n• 10h — Carlos Mendes (Apto 201)\n• 14h — Ana Souza (Casa 47)\n• 16h30 — Pedro Lima (Garden 03)" },
  { from: "user", text: "Visita com Carlos realizada, ele gostou mas vai pensar. Agenda follow-up pra quinta" },
  { from: "bot", text: "📝 Nota registrada em Carlos Mendes. ✅ Follow-up agendado: quinta-feira, 08h." },
];

export function AIAgent() {
  const ref = useRef(null);
  const chatRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const chatInView = useInView(chatRef, { once: true, margin: "-100px" });

  return (
    <section
      id="ai-agent"
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
              <Sparkles className="w-4 h-4" />
              Novo — Inteligência Artificial
            </span>
            <h2 className="heading-section mb-6">
              Seu agente de IA no
              <br />
              <span className="text-gradient">WhatsApp do corretor.</span>
            </h2>
            <p className="text-body-large max-w-2xl mx-auto">
              O corretor gerencia todo o CRM sem abrir o computador.{" "}
              <strong className="text-foreground">19 comandos em linguagem natural</strong>, direto
              pelo WhatsApp. Cria leads, agenda visitas, gera PDFs e muito mais — enquanto está na rua.
            </p>
          </motion.div>

          {/* Chat mock + feature highlights */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Chat mockup */}
            <motion.div
              ref={chatRef}
              initial={{ opacity: 0, x: -30 }}
              animate={chatInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Phone frame */}
              <div className="relative mx-auto max-w-sm">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-2xl scale-95" />

                <div className="relative bg-card border border-border/60 rounded-3xl shadow-2xl overflow-hidden">
                  {/* WhatsApp header */}
                  <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">imobHUB IA</p>
                      <p className="text-green-200 text-xs">online</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="bg-[#ECE5DD] dark:bg-secondary/40 p-4 space-y-3 min-h-[380px]">
                    {chatExamples.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={chatInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                        className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                            msg.from === "user"
                              ? "bg-[#DCF8C6] dark:bg-accent/30 text-foreground rounded-br-none"
                              : "bg-white dark:bg-card text-foreground rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#F0F0F0] dark:bg-secondary px-3 py-2 flex items-center gap-2">
                    <div className="flex-1 bg-white dark:bg-card rounded-full px-3 py-1.5 text-xs text-muted-foreground">
                      Digite um comando...
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Highlights list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={chatInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5"
            >
              <h3 className="text-2xl font-bold mb-6">
                O corretor nunca mais precisa <span className="text-accent">abrir o sistema</span> para atualizar um lead.
              </h3>
              {[
                {
                  icon: MessageSquarePlus,
                  title: "Linguagem natural",
                  desc: "Sem comandos técnicos. O corretor fala como se estivesse mandando mensagem para um colega.",
                },
                {
                  icon: CalendarPlus,
                  title: "Datas inteligentes",
                  desc: "\"Amanhã às 10h\", \"sexta-feira\", \"daqui a 3 dias\" — o agente interpreta e agenda sozinho.",
                },
                {
                  icon: Zap,
                  title: "Uma ação, tudo feito",
                  desc: "\"Visita realizada, cliente gostou, agenda retorno pra quinta\" — nota + atividade em um único comando.",
                },
                {
                  icon: BarChart2,
                  title: "Gestão para gerentes",
                  desc: "Dashboards, comparativos de equipe e transferência de leads sem sair do WhatsApp.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={chatInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-4">
                <Button className="btn-accent rounded-full px-6" asChild>
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                    Ver demonstração do agente
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* All 19 capabilities grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-center text-xl font-semibold mb-2">
              19 ações disponíveis agora
            </h3>
            <p className="text-center text-sm text-muted-foreground mb-10">
              Todas acessíveis por linguagem natural, sem apps extras, sem treinamento.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agentFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + 0.04 * index }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight mb-0.5">{feature.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 p-6 rounded-2xl bg-secondary/50 border border-border/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm">Agente de IA disponível agora</p>
                <p className="text-xs text-muted-foreground">
                  Add-on com custo adicional por consumo. Fale com nossa equipe para saber o valor para o tamanho da sua operação.
                </p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full whitespace-nowrap" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Consultar valores
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
