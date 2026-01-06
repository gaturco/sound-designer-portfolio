'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciais inválidas');
        setLoading(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('Erro ao fazer login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="bg-secondary p-8 rounded-lg border border-accent/20 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-cream">
          Admin Portal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cream mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-primary text-cream"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cream mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-accent/30 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-primary text-cream"
              required
            />
          </div>

          {error && (
            <p className="text-orange text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-primary py-2 rounded-lg hover:bg-orange transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
