import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { trackLeadForm, trackLeadFormOpen } from "@/lib/analytics";

/**
 * Chave PÚBLICA do Web3Forms (segura por design: só permite envio para o
 * e-mail verificado da conta — contato@terprise.com.br). Pode ser sobrescrita
 * em build via VITE_WEB3FORMS_KEY sem precisar recompilar este arquivo.
 */
const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "32212de5-0049-4c85-81f9-6c120366ec3f";

const WHATSAPP_FALLBACK =
  "https://wa.me/5562994616268?text=Olá! Gostaria de falar com a equipe imobHUB.";

const USER_RANGES = [
  { value: "1 a 5 usuários", label: "1 a 5 usuários" },
  { value: "5 a 20 usuários", label: "5 a 20 usuários" },
  { value: "20 a 50 usuários", label: "20 a 50 usuários" },
  { value: "Mais de 50 usuários", label: "Mais de 50 usuários" },
];

const FOCUS_OPTIONS = ["Revenda", "Lançamento", "Aluguel"] as const;

type FocusOption = (typeof FOCUS_OPTIONS)[number];

export type LeadFormContext = {
  /** Plano de origem (ex.: "Plano Inicial"), exibido no e-mail e usado para qualificar o lead. */
  plan?: string;
  /** Faixa de usuários pré-selecionada (ex.: "1 a 5 usuários"). */
  userRange?: string;
  /** Origem do clique para analytics (ex.: "pricing_inicial", "header"). */
  source?: string;
};

type LeadFormController = {
  open: (ctx?: LeadFormContext) => void;
};

const LeadFormCtx = createContext<LeadFormController | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadFormCtx);
  if (!ctx) {
    throw new Error("useLeadForm precisa estar dentro de <LeadFormProvider>");
  }
  return ctx;
}

type FormState = {
  name: string;
  phone: string;
  company: string;
  userRange: string;
  focus: FocusOption[];
};

const emptyState: FormState = {
  name: "",
  phone: "",
  company: "",
  userRange: "",
  focus: [],
};

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<LeadFormContext>({});
  const [form, setForm] = useState<FormState>(emptyState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const open = useCallback((ctx: LeadFormContext = {}) => {
    setContext(ctx);
    setForm({ ...emptyState, userRange: ctx.userRange ?? "" });
    setStatus("idle");
    setIsOpen(true);
    // Mantém o tracking de topo de funil que o link de WhatsApp tinha antes.
    trackLeadFormOpen(ctx.source ?? "lead_form", ctx.plan);
  }, []);

  const controller = useMemo<LeadFormController>(() => ({ open }), [open]);

  const toggleFocus = (option: FocusOption, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      focus: checked
        ? [...prev.focus, option]
        : prev.focus.filter((f) => f !== option),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot anti-spam: bots preenchem campos ocultos.
    const botField = (e.currentTarget.elements.namedItem("botcheck") as
      | HTMLInputElement
      | null)?.checked;
    if (botField) return;

    setStatus("submitting");

    const planLine = context.plan ? `Plano de interesse: ${context.plan}\n` : "";
    const focusLine = form.focus.length ? form.focus.join(", ") : "Não informado";

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: context.plan
        ? `Novo lead imobHUB — ${context.plan}`
        : "Novo lead imobHUB — formulário do site",
      from_name: "Site imobHUB",
      // Campos do lead (aparecem no corpo do e-mail enviado ao contato@terprise.com.br)
      Nome: form.name,
      Telefone: form.phone,
      Imobiliária: form.company,
      "Usuários estimados": form.userRange || "Não informado",
      "Foco principal": focusLine,
      message:
        `${planLine}` +
        `Nome: ${form.name}\n` +
        `Telefone: ${form.phone}\n` +
        `Imobiliária: ${form.company}\n` +
        `Usuários estimados: ${form.userRange || "Não informado"}\n` +
        `Foco principal: ${focusLine}`,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ success: false }));

      if (res.ok && data?.success) {
        trackLeadForm(context.source ?? "lead_form", context.plan);
        setStatus("success");
      } else {
        throw new Error(data?.message || "Falha no envio");
      }
    } catch (err) {
      console.error("[LeadForm] falha ao enviar para o Web3Forms:", err);
      setStatus("idle");
      toast({
        variant: "destructive",
        title: "Não foi possível enviar",
        description:
          "Ocorreu um erro ao enviar seus dados. Tente novamente ou fale com a gente pelo WhatsApp.",
        action: (
          <ToastAction altText="Falar pelo WhatsApp" asChild>
            <a href={WHATSAPP_FALLBACK} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </ToastAction>
        ),
      });
    }
  };

  return (
    <LeadFormCtx.Provider value={controller}>
      {children}

      <Dialog
        open={isOpen}
        onOpenChange={(next) => {
          // Não deixa fechar no meio do envio (evita reabrir e duplicar o lead).
          if (status === "submitting") return;
          setIsOpen(next);
        }}
      >
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          {status === "success" ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Recebemos seu contato!
                </DialogTitle>
                <DialogDescription className="text-center text-base">
                  Obrigado pelo interesse no imobHUB. Nossa equipe vai entrar em
                  contato com você em breve.
                </DialogDescription>
              </DialogHeader>
              <Button
                className="btn-accent mt-6 w-full rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Fechar
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {context.plan
                    ? `Fale com a gente — ${context.plan}`
                    : "Fale com a gente"}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados e nossa equipe entra em contato para montar a
                  proposta ideal para a sua imobiliária.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot oculto */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-2">
                  <Label htmlFor="lead-name">Nome *</Label>
                  <Input
                    id="lead-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-phone">Telefone / WhatsApp *</Label>
                  <Input
                    id="lead-phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-company">Nome da imobiliária *</Label>
                  <Input
                    id="lead-company"
                    required
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    placeholder="Sua imobiliária"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lead-users">Quantidade estimada de usuários *</Label>
                  <Select
                    value={form.userRange}
                    onValueChange={(value) =>
                      setForm({ ...form, userRange: value })
                    }
                  >
                    <SelectTrigger id="lead-users">
                      <SelectValue placeholder="Selecione uma faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_RANGES.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Foco principal *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {FOCUS_OPTIONS.map((option) => {
                      const checked = form.focus.includes(option);
                      return (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                            checked
                              ? "border-accent bg-accent/10 text-foreground"
                              : "border-border hover:border-accent/40"
                          }`}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(c) =>
                              toggleFocus(option, c === true)
                            }
                          />
                          {option}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="btn-accent w-full rounded-full"
                  disabled={
                    status === "submitting" ||
                    !form.userRange ||
                    form.focus.length === 0
                  }
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Seus dados são enviados direto para a nossa equipe. Sem spam.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </LeadFormCtx.Provider>
  );
}
