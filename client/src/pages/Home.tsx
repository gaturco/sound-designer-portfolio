import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects, { ProjectCard } from '@/components/Projects';
import Contact, { ContactLink } from '@/components/Contact';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';

export default function Home() {
  const { data: projects = [] } = trpc.projects.list.useQuery();
  const { data: aboutData } = trpc.content.getAbout.useQuery();
  const { data: contactLinks = [] } = trpc.content.getContactLinks.useQuery();

  // Default values if data is not loaded
  const heroData = {
    name: 'Sound Designer',
    title: 'Criador de Experiências Sonoras',
    bio: 'Especialista em design de áudio para jogos, filmes e animações. Transformo ideias em sons memoráveis.',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
  };

  const metrics = [
    { label: 'Anos de Experiência', value: aboutData?.yearsExperience || '5+' },
    { label: 'Projetos Concluídos', value: aboutData?.projectsCount || '50+' },
    { label: 'Clientes Satisfeitos', value: aboutData?.clientsCount || '30+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero {...heroData} />
      <About
        bio={aboutData?.bio || 'Bem-vindo ao meu portfólio de Sound Design. Aqui você encontrará meus projetos mais recentes e informações sobre meu trabalho.'}
        metrics={metrics}
      />
      <Projects projects={projects as ProjectCard[]} />
      <Contact links={contactLinks as ContactLink[]} />
      <Footer />
    </div>
  );
}
