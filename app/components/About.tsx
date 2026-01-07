'use client';

import { Mail, Linkedin, Music, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ContentData {
  bio?: string;
  email?: string;
  linkedin?: string;
  soundcloud?: string;
  instagram?: string;
  twitter?: string;
}

export default function About() {
  const [data, setData] = useState<ContentData>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching content:', err));
  }, []);

  return (
    <section id="sobre" className="py-20 px-4 bg-secondary">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-cream/90 mb-12 leading-relaxed">
            {data.bio || 'Carregando...'}
          </p>

          <div className="flex justify-center gap-6">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="Email"
              >
                <Mail size={20} />
              </a>
            )}
            
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            
            {data.soundcloud && (
              <a
                href={data.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="SoundCloud"
              >
                <Music size={20} />
              </a>
            )}
            
            {data.instagram && (
              <a
                href={data.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            
            {data.twitter && (
              <a
                href={data.twitter}
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
