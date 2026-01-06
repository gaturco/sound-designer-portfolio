'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  type: string;
  tags: string;
  thumbnail?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projetos" className="py-20 bg-secondary px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-cream">Meus Projetos</h2>
        <p className="text-center text-cream/70 mb-12 max-w-2xl mx-auto">
          Uma seleção dos meus melhores trabalhos em design de áudio
        </p>

        {loading ? (
          <div className="text-center py-12 text-cream">Carregando projetos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-primary rounded-lg overflow-hidden hover:shadow-lg transition border border-accent/20"
              >
                <div className={`h-48 flex items-center justify-center group-hover:scale-105 transition ${project.thumbnail ? 'overflow-hidden' : 'bg-cream'}`}>
                  {project.thumbnail ? (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">🎵</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-cream group-hover:text-accent transition">
                    {project.title}
                  </h3>
                  <p className="text-cream/70 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="text-xs bg-brown text-cream px-2 py-1 rounded">
                        {project.type}
                      </span>
                    </div>
                    <ExternalLink size={16} className="text-accent" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
