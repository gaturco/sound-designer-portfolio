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

export default function Contact() {
  const [socialData, setSocialData] = useState<SocialData>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setSocialData(data))
      .catch(err => console.error('Error fetching content:', err));
  }, []);

  return (
    <section id="contato" className="py-20 bg-primary px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cream">Vamos Conversar?</h2>
        <p className="text-cream/70 mb-12 max-w-2xl mx-auto">
          Estou sempre aberto para novos projetos e colaborações. Sinta-se livre para entrar em contato!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 flex-wrap">
          {socialData.email && (
            <a
              href={`mailto:${socialData.email}`}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium"
            >
              <Mail size={20} />
            </a>
          )}
          
          {socialData.linkedin && (
            <a
              href={socialData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition font-medium"
            >
              <Linkedin size={20} />
            </a>
          )}
          
          {socialData.soundcloud && (
            <a
              href={socialData.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition font-medium"
            >
              <Music size={20} />
            </a>
          )}
          
          {socialData.instagram && (
            <a
              href={socialData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition font-medium"
            >
              <Instagram size={20} />
            </a>
          )}
          
          {socialData.twitter && (
            <a
              href={socialData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
