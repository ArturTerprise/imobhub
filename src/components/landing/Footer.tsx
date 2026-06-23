import { Link } from "react-router-dom";
import logo from "@/assets/logo-imobhub.png";

const footerLinks = {
  produto: [
    { label: "Funcionalidades", href: "#features" },
    { label: "Integrações", href: "#integrations" },
  ],
  empresa: [
    { label: "Sobre nós", href: "/sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Carreiras", href: "/carreiras" },
  ],
  suporte: [
    { label: "Central de Ajuda", href: "/ajuda" },
    { label: "Contato", href: "/contato" },
  ],
  legal: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <img src={logo} alt="ImobHub" className="h-10 w-auto mb-4 brightness-0 invert" />
            </Link>
            <p className="text-sm text-primary-foreground/60 mb-4">
              O ecossistema completo para gestão imobiliária.
            </p>
            <p className="text-sm text-primary-foreground/60">
              by Terprise Software House
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">
              Produto
            </h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">
              Suporte
            </h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Integração Google */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-primary-foreground/80">
            Integração com o Google Agenda
          </h4>
          <p className="text-sm text-primary-foreground/60 max-w-4xl leading-relaxed">
            O imobHUB é uma plataforma de gestão imobiliária (CRM, site, portal de vendas e
            automações) para imobiliárias e corretores. Oferecemos uma integração{" "}
            <span className="text-primary-foreground/80">opcional</span> com o Google Agenda:
            ao conectar sua conta Google, o app{" "}
            <span className="text-primary-foreground/80">imobhub-google-integrations</span>{" "}
            sincroniza os agendamentos feitos no imobHUB — visitas a imóveis, reuniões e
            follow-ups — criando, atualizando e removendo os eventos correspondentes no seu
            Google Agenda. Usamos o escopo{" "}
            <span className="text-primary-foreground/80">.../auth/calendar.events</span>{" "}
            apenas para gerenciar esses eventos e o escopo{" "}
            <span className="text-primary-foreground/80">.../auth/userinfo.email</span>{" "}
            apenas para identificar a conta Google conectada. A conexão é opt-in e pode ser
            revogada a qualquer momento. O uso e a transferência de dados recebidos das Google
            APIs seguem a nossa{" "}
            <Link to="/privacidade" className="underline hover:text-primary-foreground">
              Política de Privacidade
            </Link>{" "}
            e a{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-foreground"
            >
              Google API Services User Data Policy
            </a>
            , incluindo os requisitos de Uso Limitado.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} imobHUB. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
