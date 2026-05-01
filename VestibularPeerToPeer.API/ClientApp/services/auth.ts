import type { User } from '@/types';
import { usuarioService } from './usuario.service';
import { fetchJson } from './api/fetch-json';
import { clearAuthToken, getAuthToken, setAuthToken } from './auth-token';

// Autenticação: orquestra chamadas aos serviços de domínio (usuário, sessão, etc.)

type LoginResponse = {
  token: string;
  user: {
    id?: string;
    nome?: string;
    email?: string;
  };
};

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const res = await fetchJson<LoginResponse>('/api/usuarios/login', {
      method: 'POST',
      body: { email, senha: password },
    });
    setAuthToken(res.token);
    return {
      id: res.user.id,
      name: res.user.nome || 'Usuário',
      email: res.user.email || email,
    };
  },

  async register(name: string, email: string, password: string): Promise<User> {
    await usuarioService.cadastrar({
      nome: name,
      email,
      senha: password,
    });
    return authService.login(email, password);
  },

  async logout(): Promise<void> {
    clearAuthToken();
  },

  async getCurrentUser(): Promise<User | null> {
    const token = getAuthToken();
    if (!token) return null;

    const payload = parseJwtPayload(token);
    if (!payload) {
      clearAuthToken();
      return null;
    }

    const exp = typeof payload.exp === 'number' ? payload.exp : null;
    if (exp && Date.now() >= exp * 1000) {
      clearAuthToken();
      return null;
    }

    const id = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const nome = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    return {
      id: typeof id === 'string' ? id : undefined,
      email: typeof email === 'string' ? email : undefined,
      name: typeof nome === 'string' && nome ? nome : 'Usuário',
    };
  },
};
