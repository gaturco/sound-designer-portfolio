'use client';

import { Mail, Linkedin, Music, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SocialData {
  email?: string;
  linkedin?: string;
  soundcloud?: string;
  instagram?: string;
  twitter?: string;
}

export default function Hero() {
  const [socialData, setSocialData] = useState<SocialData>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setSocialData(data))
      .catch(err => console.error('Error fetching content:', err));
  }, []);

  return (
    <section id="sobre" className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 w-48 h-48 mx-auto">
          <img 
            src="/profile.jpg" 
            alt="Gabriel Turco Profile" 
            className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cream">
          Gabriel Turco
        </h1>
        
        <p className="text-xl md:text-2xl text-orange mb-4">
          Criando experiências sonoras imersivas
        </p>
        
        <p className="text-lg text-cream/80 max-w-2xl mx-auto mb-8">
          Especializado em design de áudio para games, vídeos e projetos interativos. 
          Com anos de experiência criando soundscapes memoráveis e imersivos.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="#projetos" className="inline-block px-8 py-3 bg-accent text-primary rounded-lg hover:bg-orange transition font-semibold">
            Ver Portfólio
          </a>
          
          <div className="flex gap-3">
            {socialData.email && (
              <a
                href={`mailto:${socialData.email}`}
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="Email"
              >
                <Mail size={20} />
              </a>
            )}
            
            {socialData.linkedin && (
              <a
                href={socialData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            
            {socialData.soundcloud && (
              <a
                href={socialData.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="SoundCloud"
              >
                <Music size={20} />
              </a>
            )}
            
            {socialData.instagram && (
              <a
                href={socialData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            
            {socialData.twitter && (
              <a
                href={socialData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
