'use client';

import { useEffect, useState } from 'react';
import { Headphones, Music, Volume2, Wand2 } from 'lucide-react';

interface Specialty {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

const iconMap: Record<string, any> = {
  headphones: Headphones,
  music: Music,
  volume: Volume2,
  wand: Wand2,
};

export default function Specialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/specialties')
      .then(res => res.json())
      .then(data => {
        setSpecialties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching specialties:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-primary px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-cream">Carregando...</p>
        </div>
      </section>
    );
  }

  if (specialties.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-primary px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-cream">Especialidades</h2>
        <p className="text-center text-cream/70 mb-12 max-w-2xl mx-auto">
          Áreas de atuação e expertise
        </p>

        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
          {specialties.map(specialty => {
            const IconComponent = specialty.icon ? iconMap[specialty.icon] : Music;
            
            return (
              <div
                key={specialty.id}
                className="bg-secondary p-6 rounded-lg border border-accent/20 text-center hover:border-accent/50 transition w-full"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    {IconComponent && <IconComponent size={32} className="text-accent" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-cream">
                  {specialty.title}
                </h3>
                <p className="text-cream/70 text-sm">
                  {specialty.description}
                </p>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
