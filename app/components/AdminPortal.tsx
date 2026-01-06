'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  type: string;
  tags: string;
}

export default function AdminPortal() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    type: 'Game',
    tags: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
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
        setFormData({ title: '', description: '', link: '', type: 'Game', tags: '' });
        setShowForm(false);
        fetchProjects();
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-secondary border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cream">Admin Portal</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-brown text-cream rounded-lg hover:bg-brown/80 transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-cream">Projetos</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium"
          >
            <Plus size={20} />
            Novo Projeto
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-secondary p-6 rounded-lg border border-accent/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-cream mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-cream focus:outline-none focus:border-accent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-cream mb-2">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-cream focus:outline-none focus:border-accent"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-cream mb-2">Link</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-cream focus:outline-none focus:border-accent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-cream mb-2">Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-cream focus:outline-none focus:border-accent"
                  >
                    <option>Game</option>
                    <option>Video</option>
                    <option>Audio</option>
                    <option>Podcast</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-cream mb-2">Tags</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="ex: sound-design, music"
                    className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-cream focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-orange transition font-medium"
                >
                  Criar Projeto
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-brown text-cream rounded-lg hover:bg-brown/80 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-cream">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-secondary rounded-lg p-6 border border-accent/20"
              >
                <h3 className="text-xl font-bold text-cream mb-2">{project.title}</h3>
                <p className="text-cream/70 text-sm mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-brown text-cream px-2 py-1 rounded">
                    {project.type}
                  </span>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-orange hover:bg-primary rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
