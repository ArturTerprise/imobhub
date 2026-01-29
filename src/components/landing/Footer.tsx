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
              by Terprise Soluções Digitais
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} ImobHub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
