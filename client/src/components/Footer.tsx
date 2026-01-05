export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SD</span>
              </div>
              <span className="font-bold text-foreground">Sound Designer</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Criando experiências sonoras imersivas e memoráveis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#sobre-mim" className="hover:text-blue-600 transition-colors duration-300">
                  Sobre Mim
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-blue-600 transition-colors duration-300">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-blue-600 transition-colors duration-300">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Informações</h3>
            <p className="text-sm text-muted-foreground">
              Portfólio profissional de Sound Design e Produção de Áudio.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Sound Designer. Todos os direitos reservados.</p>
            <p className="mt-4 md:mt-0">
              Desenvolvido com <span className="text-blue-600">♥</span> usando Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
