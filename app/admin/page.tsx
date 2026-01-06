'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Plus, Trash2, Edit2, LogOut, Settings, User } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  type: string;
  tags: string;
  thumbnail?: string;
}

interface Specialty {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'social' | 'specialties'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSpecialtyForm, setShowSpecialtyForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    type: 'jogo',
    tags: '',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  });
  
  const [specialtyFormData, setSpecialtyFormData] = useState({
    title: '',
    description: '',
    icon: 'music',
  });
  
  const [aboutData, setAboutData] = useState({
    bio: '',
  });
  
  const [socialData, setSocialData] = useState({
    email: '',
    linkedin: '',
    soundcloud: '',
    instagram: '',
    twitter: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProjects();
      fetchContent();
      fetchSpecialties();
    }
  }, [status]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      
      setAboutData({
        bio: data.bio || '',
      });
      
      setSocialData({
        email: data.email || '',
        linkedin: data.linkedin || '',
        soundcloud: data.soundcloud || '',
        instagram: data.instagram || '',
        twitter: data.twitter || '',
      });
    } catch (err) {
      console.error('Error fetching content:', err);
    }
  };

  const saveContent = async (key: string, value: string) => {
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
    } catch (err) {
      console.error('Error saving content:', err);
    }
  };

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveContent('bio', aboutData.bio);
    alert('Informações do Sobre atualizadas!');
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Promise.all([
      saveContent('email', socialData.email),
      saveContent('linkedin', socialData.linkedin),
      saveContent('soundcloud', socialData.soundcloud),
      saveContent('instagram', socialData.instagram),
      saveContent('twitter', socialData.twitter),
    ]);
    alert('Redes sociais atualizadas!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ title: '', description: '', link: '', type: 'jogo', tags: '', thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg' });
        setShowForm(false);
        fetchProjects();
      }
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const res = await fetch('/api/specialties');
      const data = await res.json();
      setSpecialties(data);
    } catch (err) {
      console.error('Error fetching specialties:', err);
    }
  };

  const handleSpecialtySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/specialties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(specialtyFormData),
      });

      if (res.ok) {
        setSpecialtyFormData({ title: '', description: '', icon: 'music' });
        setShowSpecialtyForm(false);
        fetchSpecialties();
      }
    } catch (err) {
      console.error('Error creating specialty:', err);
    }
  };

  const handleDeleteSpecialty = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta especialidade?')) return;

    try {
      const res = await fetch(`/api/specialties/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchSpecialties();
      }
    } catch (err) {
      console.error('Error deleting specialty:', err);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <p className="text-cream">Carregando...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-secondary border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cream">Admin Portal</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-brown text-cream rounded-lg hover:bg-brown/80 transition"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-accent/20">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 px-4 font-medium transition ${
              activeTab === 'projects'
                ? 'border-b-2 border-accent text-accent'
                : 'text-cream/70 hover:text-cream'
            }`}
          >
            <Plus size={18} className="inline mr-2" />
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 px-4 font-medium transition ${
              activeTab === 'about'
                ? 'border-b-2 border-accent text-accent'
                : 'text-cream/70 hover:text-cream'
            }`}
          >
            <User size={18} className="inline mr-2" />
            Sobre
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`pb-3 px-4 font-medium transition ${
              activeTab === 'social'
                ? 'border-b-2 border-accent text-accent'
                : 'text-cream/70 hover:text-cream'
            }`}
          >
            <Settings size={18} className="inline mr-2" />
            Redes Sociais
          </button>
          <button
            onClick={() => setActiveTab('specialties')}
            className={`pb-3 px-4 font-medium transition ${
              activeTab === 'specialties'
                ? 'border-b-2 border-accent text-accent'
                : 'text-cream/70 hover:text-cream'
            }`}
          >
            <Edit2 size={18} className="inline mr-2" />
            Especialidades
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-cream">Projetos</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium cursor-pointer"
              >
                <Plus size={16} />
                Novo Projeto
              </button>
            </div>

            {showForm && (
          <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-lg border border-accent/20 mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-cream mb-2">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-2">
                Link
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-2">
                Thumbnail (URL da imagem)
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
                placeholder="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-cream mb-2">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
              >
                <option value="jogo">Jogo</option>
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium cursor-pointer"
              >
                Criar Projeto
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-brown text-cream rounded-lg hover:bg-brown/80 transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-center py-12 text-cream">Carregando...</p>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-secondary p-6 rounded-lg border border-accent/20 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-cream mb-2">
                    {project.title}
                  </h3>
                  <p className="text-cream/70 mb-2">{project.description}</p>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs bg-brown text-cream px-2 py-1 rounded">
                      {project.type}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-orange transition"
                    >
                      Ver projeto →
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-orange hover:bg-primary rounded transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
          </>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-cream mb-6">Informações do Sobre</h2>
            <form onSubmit={handleAboutSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-cream mb-2">
                  Biografia
                </label>
                <textarea
                  value={aboutData.bio}
                  onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-secondary text-cream focus:outline-none focus:border-accent"
                  rows={4}
                  placeholder="Especializado em design de áudio para games..."
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium cursor-pointer"
              >
                Salvar Informações
              </button>
            </form>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-cream mb-6">Redes Sociais</h2>
            <form onSubmit={handleSocialSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-cream mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={socialData.email}
                  onChange={(e) => setSocialData({ ...socialData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-secondary text-cream focus:outline-none focus:border-accent"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cream mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={socialData.linkedin}
                  onChange={(e) => setSocialData({ ...socialData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-secondary text-cream focus:outline-none focus:border-accent"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cream mb-2">
                  SoundCloud
                </label>
                <input
                  type="url"
                  value={socialData.soundcloud}
                  onChange={(e) => setSocialData({ ...socialData, soundcloud: e.target.value })}
                  className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-secondary text-cream focus:outline-none focus:border-accent"
                  placeholder="https://soundcloud.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cream mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={socialData.instagram}
                  onChange={(e) => setSocialData({ ...socialData, instagram: e.target.value })}
                  className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-secondary text-cream focus:outline-none focus:border-accent"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cream mb-2">
                  X (Twitter)
                </label>
                <input
                  type="url"
                  value={socialData.twitter}
                  onChange={(e) => setSocialData({ ...socialData, twitter: e.target.value })}
                  className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-secondary text-cream focus:outline-none focus:border-accent"
                  placeholder="https://x.com/..."
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium cursor-pointer"
              >
                Salvar Redes Sociais
              </button>
            </form>
          </div>
        )}

        {/* Specialties Tab */}
        {activeTab === 'specialties' && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-cream">Especialidades</h2>
              <button
                onClick={() => setShowSpecialtyForm(!showSpecialtyForm)}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium cursor-pointer"
              >
                <Plus size={16} />
                Nova Especialidade
              </button>
            </div>

            {showSpecialtyForm && (
              <form onSubmit={handleSpecialtySubmit} className="bg-secondary p-6 rounded-lg border border-accent/20 mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cream mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={specialtyFormData.title}
                    onChange={(e) => setSpecialtyFormData({ ...specialtyFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={specialtyFormData.description}
                    onChange={(e) => setSpecialtyFormData({ ...specialtyFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream mb-2">
                    Ícone
                  </label>
                  <select
                    value={specialtyFormData.icon}
                    onChange={(e) => setSpecialtyFormData({ ...specialtyFormData, icon: e.target.value })}
                    className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-primary text-cream focus:outline-none focus:border-accent"
                  >
                    <option value="music">Música</option>
                    <option value="headphones">Headphones</option>
                    <option value="volume">Volume</option>
                    <option value="wand">Varinha Mágica</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium cursor-pointer"
                  >
                    Criar Especialidade
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSpecialtyForm(false)}
                    className="px-4 py-2 bg-brown text-cream rounded-lg hover:bg-brown/80 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            <div className="grid gap-4">
              {specialties.map((specialty) => (
                <div
                  key={specialty.id}
                  className="bg-secondary p-6 rounded-lg border border-accent/20 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-cream mb-2">
                      {specialty.title}
                    </h3>
                    <p className="text-cream/70 mb-2">{specialty.description}</p>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs bg-brown text-cream px-2 py-1 rounded">
                        {specialty.icon || 'music'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteSpecialty(specialty.id)}
                      className="text-red-500 hover:text-red-700 transition cursor-pointer"
                      title="Deletar"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
