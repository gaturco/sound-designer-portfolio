import { ExternalLink } from 'lucide-react';

export interface ProjectCard {
  id: number;
  title: string;
  description: string | null;
  type: string;
  link: string;
  tags?: string | null;
}

interface ProjectsProps {
  projects: ProjectCard[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projetos" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">Meus Projetos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-600 rounded-full text-sm font-semibold">
                    {project.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {project.description}
                </p>
                
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {typeof project.tags === 'string' && project.tags.split(',').map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all duration-300">
                  Ver Projeto
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum projeto disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}
