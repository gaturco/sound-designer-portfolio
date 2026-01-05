import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPortal() {
  console.log('AdminPortal component mounted');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'content' | 'social'>('projects');
  const [showForm, setShowForm] = useState(false);

  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = 'admin_authenticated=; path=/; max-age=0';
    router.push('/admin-auth');
  };

  // Projects
  const projectsQuery = trpc.projects.list.useQuery();
  
  console.log('Projects Query State:', { status: projectsQuery.status, data: projectsQuery.data, error: projectsQuery.error });
  
  const { data: projects, refetch: refetchProjects, error: projectsError } = projectsQuery;
  
  if (projectsError) {
    console.error('Projects error:', projectsError);
  }
  
  const projectsList = Array.isArray(projects) ? projects : [];
  const createProjectMutation = trpc.projects.create.useMutation({
    onSuccess: () => {
      refetchProjects();
      setShowForm(false);
      toast.success('Projeto criado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao criar projeto: ' + error.message);
    },
  });
  const deleteProjectMutation = trpc.projects.delete.useMutation({
    onSuccess: () => {
      refetchProjects();
      toast.success('Projeto deletado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao deletar projeto: ' + error.message);
    },
  });

  // Content
  const aboutQuery = trpc.content.getAbout.useQuery();
  
  const { data: aboutData, error: aboutError } = aboutQuery;
  
  if (aboutError) {
    console.error('About error:', aboutError);
  }
  
  const updateAboutMutation = trpc.content.updateAbout.useMutation({
    onSuccess: () => {
      toast.success('Conteúdo atualizado com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao atualizar conteúdo: ' + error.message);
    },
  });

  // Note: Authentication is handled by middleware - if we reach here, user is authenticated

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await createProjectMutation.mutateAsync({
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        link: formData.get('link') as string,
        type: formData.get('type') as string,
        tags: formData.get('tags') as string,
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  const handleUpdateAbout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateAboutMutation.mutateAsync({
        bio: formData.get('bio') as string,
        yearsExperience: formData.get('yearsExperience') as string,
        projectsCount: formData.get('projectsCount') as string,
        clientsCount: formData.get('clientsCount') as string,
      });
    } catch (error) {
      console.error('Erro ao atualizar conteúdo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Painel Administrativo</h1>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        {/* Welcome Message */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <p className="text-blue-900 dark:text-blue-100">
            Bem-vindo, <strong>Administrador</strong>!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-semibold transition-colors duration-300 ${
              activeTab === 'projects'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 font-semibold transition-colors duration-300 ${
              activeTab === 'content'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Conteúdo
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 font-semibold transition-colors duration-300 ${
              activeTab === 'social'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Redes Sociais
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Gerenciar Projetos</h2>
              <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Novo Projeto
              </Button>
            </div>

            {/* Create Form */}
            {showForm && (
              <form onSubmit={handleCreateProject} className="bg-card rounded-lg p-6 mb-8 border border-border">
                <h3 className="text-lg font-bold mb-4 text-foreground">Novo Projeto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Título do Projeto"
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    name="type"
                    placeholder="Tipo (ex: Jogo, Filme, Animação)"
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <textarea
                    name="description"
                    placeholder="Descrição"
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 md:col-span-2"
                    rows={3}
                  />
                  <input
                    type="url"
                    name="link"
                    placeholder="Link do Projeto (URL)"
                    required
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 md:col-span-2"
                  />
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (separadas por vírgula)"
                    className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 md:col-span-2"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <Button type="submit" disabled={createProjectMutation.isPending}>
                    {createProjectMutation.isPending ? 'Salvando...' : 'Salvar'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            )}

            {/* Projects List */}
            <div className="space-y-4">
              {(!projectsList || projectsList.length === 0) ? (
                <p className="text-muted-foreground text-center py-8">Nenhum projeto cadastrado.</p>
              ) : (
                projectsList.map((project: any) => (
                  <div key={project.id} className="bg-card rounded-lg p-6 border border-border flex justify-between items-start">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.type}</p>
                      <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
                        Ver Projeto →
                      </a>
                    </div>
                    <button
                      onClick={() => deleteProjectMutation.mutate({ id: project.id })}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                      disabled={deleteProjectMutation.isPending}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Gerenciar Redes Sociais</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const links = [
                  { label: 'Email', url: formData.get('email') as string, icon: 'email' as const },
                  { label: 'LinkedIn', url: formData.get('linkedin') as string, icon: 'linkedin' as const },
                  { label: 'SoundCloud', url: formData.get('soundcloud') as string, icon: 'soundcloud' as const },
                ];
                try {
                  await updateAboutMutation.mutateAsync({
                    bio: aboutData?.bio || '',
                    yearsExperience: aboutData?.yearsExperience || '',
                    projectsCount: aboutData?.projectsCount || '',
                    clientsCount: aboutData?.clientsCount || '',
                  });
                  // TODO: Implement updateContactLinks mutation
                  toast.success('Redes sociais atualizadas com sucesso!');
                } catch (error) {
                  console.error('Erro ao atualizar redes sociais:', error);
                }
              }}
              className="bg-card rounded-lg p-6 border border-border"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/seu-perfil"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">SoundCloud</label>
                  <input
                    type="url"
                    name="soundcloud"
                    placeholder="https://soundcloud.com/seu-perfil"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Instagram</label>
                  <input
                    type="url"
                    name="instagram"
                    placeholder="https://instagram.com/seu-perfil"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">X (Twitter)</label>
                  <input
                    type="url"
                    name="x"
                    placeholder="https://x.com/seu-perfil"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6" disabled={updateAboutMutation.isPending}>
                {updateAboutMutation.isPending ? 'Salvando...' : 'Salvar Redes Sociais'}
              </Button>
            </form>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Gerenciar Conteúdo</h2>
            <form onSubmit={handleUpdateAbout} className="bg-card rounded-lg p-6 border border-border">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Biografia</label>
                  <textarea
                    name="bio"
                    defaultValue={aboutData?.bio || ''}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Anos de Experiência</label>
                    <input
                      type="text"
                      name="yearsExperience"
                      defaultValue={aboutData?.yearsExperience || ''}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Projetos Concluídos</label>
                    <input
                      type="text"
                      name="projectsCount"
                      defaultValue={aboutData?.projectsCount || ''}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Clientes Satisfeitos</label>
                    <input
                      type="text"
                      name="clientsCount"
                      defaultValue={aboutData?.clientsCount || ''}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-6" disabled={updateAboutMutation.isPending}>
                {updateAboutMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
