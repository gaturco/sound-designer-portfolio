'use client';

import { Mail, Linkedin, Music, Instagram } from 'lucide-react';
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
              <SoundCloudIcon size={20} />
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
