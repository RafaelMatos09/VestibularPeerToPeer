import type { User } from '@/types';

// Serviço de autenticação
// TODO: Substituir pela integração real com seu backend

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // TODO: Implementar chamada real à API
    // Exemplo:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    // });
    // return response.json();

    // Mock para desenvolvimento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id: '1', name: 'Estudante Demo', email };
  },

  async register(name: string, email: string, password: string): Promise<User> {
    // TODO: Implementar chamada real à API
    // Exemplo:
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ name, email, password }),
    // });
    // return response.json();

    // Mock para desenvolvimento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id: '2', name, email };
  },

  async logout(): Promise<void> {
    // TODO: Implementar logout real
    // Exemplo:
    // await fetch('/api/auth/logout', { method: 'POST' });

    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  async getCurrentUser(): Promise<User | null> {
    // TODO: Implementar verificação de sessão
    // Exemplo:
    // const response = await fetch('/api/auth/me');
    // if (!response.ok) return null;
    // return response.json();

    return null;
  },
};
