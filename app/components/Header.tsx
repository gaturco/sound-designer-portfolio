import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-secondary border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-accent">
            Gabriel Turco
          </Link>
          
          <nav className="flex gap-8">
            <Link href="#sobre" className="text-cream hover:text-accent transition">Sobre</Link>
            <Link href="#projetos" className="text-cream hover:text-accent transition">Projetos</Link>
            <Link href="#contato" className="text-cream hover:text-accent transition">Contato</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
