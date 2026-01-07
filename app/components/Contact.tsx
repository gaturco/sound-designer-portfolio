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
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 30.667 30.667" fill="currentColor">
    <g>
      <path d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017
        c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382
        c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076
        c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427
        c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437
        c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536
        c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609
        c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611
        c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787
        c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739
        C23.307,19.268,23.307,18.533,23.214,18.38z"/>
    </g>
  </svg>
);
interface SocialData {
  email?: string;
  linkedin?: string;
  soundcloud?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
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
          {socialData.whatsapp && (
            <a
              href={socialData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-3 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium"
            >
              <WhatsAppIcon size={20} />
            </a>
          )}
          
          {socialData.email && (
            <a
              href={`mailto:${socialData.email}`}
              className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition font-medium"
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
