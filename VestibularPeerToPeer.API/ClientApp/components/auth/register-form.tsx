'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      await register(name, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Users size={32} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Criar Conta</h1>
          <p className="mt-2 text-muted-foreground">Junte-se à comunidade</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-input bg-input/30 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-input/30 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-input/30 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Confirmar Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-input/30 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <Link
            href="/login"
            className="block w-full py-2 text-center font-semibold text-primary transition hover:text-primary/80"
          >
            Já tenho conta
          </Link>
        </form>
      </div>
    </div>
  );
}
