import { motion } from "framer-motion";

const footerLinks = {
  produto: [
    { label: "Funcionalidades", href: "#features" },
    { label: "Integrações", href: "#integrations" },
    { label: "Preços", href: "#" },
  ],
  empresa: [
    { label: "Sobre nós", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Carreiras", href: "#" },
  ],
  suporte: [
    { label: "Central de Ajuda", href: "#" },
    { label: "Contato", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-extrabold mb-4">
              Imob<span className="text-accent">Hub</span>
            </div>
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
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
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
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
