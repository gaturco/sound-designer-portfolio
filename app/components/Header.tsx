import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-secondary border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="hover:opacity-80 transition">
            <Image
              src="/logo.svg"
              alt="Gabriel Turco - Sound Designer"
              width={120}
              height={50}
              priority
            />
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
