import { Mail, Linkedin, Music, Instagram, Twitter } from 'lucide-react';

export interface ContactLink {
  label: string;
  url: string;
  icon: 'email' | 'linkedin' | 'soundcloud' | 'instagram' | 'x' | 'custom';
}

interface ContactProps {
  links: ContactLink[];
}

const iconMap = {
  email: Mail,
  linkedin: Linkedin,
  soundcloud: Music,
  instagram: Instagram,
  x: Twitter,
  custom: Music,
};

export default function Contact({ links }: ContactProps) {
  return (
    <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Entre em Contato</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Vamos conversar sobre seu próximo projeto de áudio!
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link, index) => {
            const Icon = iconMap[link.icon] || Music;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-background rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600/10 transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
