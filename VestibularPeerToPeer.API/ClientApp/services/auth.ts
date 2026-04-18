import type { User } from '@/types';
import { usuarioService } from './usuario.service';

// Autenticação: orquestra chamadas aos serviços de domínio (usuário, sessão, etc.)

export const authService = {
  async login(email: string, password: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id: '1', name: 'Estudante Demo', email };
  },

  async register(name: string, email: string, password: string): Promise<User> {
    return usuarioService.cadastrar({
      nome: name,
      email,
      senha: password,
    });
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  async getCurrentUser(): Promise<User | null> {
    return null;
  },
};
