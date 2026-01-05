import { useEffect, useState } from 'react';

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
}

export default function Hero({ name, title, bio, imageUrl }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Imagem */}
          <div className={`flex justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
              <img
                src={imageUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop'}
                alt={name}
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              {name}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
              {title}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {bio}
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#projetos"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Ver Projetos
              </a>
              <a
                href="#contato"
                className="px-8 py-3 border-2 border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Entrar em Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
