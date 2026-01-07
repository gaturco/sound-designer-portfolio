'use client';

import { Mail, Linkedin, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

const SoundCloudIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <g>
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M4 10a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0v-7a1 1 0 0 1 1-1zm3 1a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm3-4a1 1 0 0 1 1 1v10a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1zm5-1a6 6 0 0 1 5.996 5.775l.003.26a3.5 3.5 0 0 1-.307 6.96L20.5 19h-3.501a1 1 0 0 1-.117-1.993L17 17h3.447l.138-.002a1.5 1.5 0 0 0 .267-2.957l-.135-.026-1.77-.252.053-1.787-.004-.176A4 4 0 0 0 15.2 8.005L15 8c-.268 0-.531.026-.788.077L14 8.126V18a1 1 0 0 1-.883.993L13 19a1 1 0 0 1-1-1l-.001-11.197A5.972 5.972 0 0 1 15 6zM1 12a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1z"/>
    </g>
  </svg>
);

interface SocialData {
  email?: string;
  linkedin?: string;
  soundcloud?: string;
  instagram?: string;
  twitter?: string;
  bio?: string;
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
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Foto - à esquerda no desktop, em cima no mobile */}
          <div className="order-1 md:order-1 flex justify-center">
            <div className="w-80 h-80 md:w-[28rem] md:h-[28rem]">
              <img 
                src="/profile.jpg" 
                alt="Gabriel Turco Profile" 
                className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Texto - embaixo no mobile, à direita no desktop */}
          <div className="order-2 text-center md:text-left">
            <p className="text-sm md:text-base text-orange mb-8 tracking-widest">
              GRAVAÇÃO, PÓS-PRODUÇÃO<br />E FINALIZAÇÃO DE ÁUDIO
            </p>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-cream">
              EU SOU<br />GABRIEL<br />TURCO<span className="text-accent">.</span>
            </h1>

            <p className="text-lg text-cream/80 mb-8 max-w-2xl">
              {socialData.bio}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
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
                    <SoundCloudIcon size={20} />
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
        </div>
      </div>
    </section>
  );
}
