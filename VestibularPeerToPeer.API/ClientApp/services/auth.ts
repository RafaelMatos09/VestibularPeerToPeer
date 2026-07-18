import type { User } from '@/types';
import { usuarioService } from './usuario.service';
import { fetchJson } from './api/fetch-json';
import { clearAuthToken, getAuthToken, setAuthToken } from './auth-token';
import { clearAuthSession, getAuthSession, setAuthSession } from './auth-session';

// Autenticação: orquestra chamadas aos serviços de domínio (usuário, sessão, etc.)

type LoginResponse = {
  token: string;
  user: {
    id?: string;
    nome?: string;
    email?: string;
    tipoUsuarioId?: number | string | null;
    instituicaoId?: number | string | null;
  };
};

function toOptionalString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  return String(value);
}

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

function clearAuth(): void {
  clearAuthToken();
  clearAuthSession();
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const res = await fetchJson<LoginResponse>('/api/usuarios/login', {
      method: 'POST',
      body: { email, senha: password },
    });
    setAuthToken(res.token);

    const usuarioId = toOptionalString(res.user.id) ?? '';
    const tipoUsuarioId = toOptionalString(res.user.tipoUsuarioId) ?? '';
    const instituicaoId = toOptionalString(res.user.instituicaoId) ?? '';
    const userEmail = res.user.email || email;

    setAuthSession({
      usuarioId,
      tipoUsuarioId,
      instituicaoId,
      email: userEmail,
    });

    return {
      id: usuarioId || undefined,
      name: res.user.nome || 'Usuário',
      email: userEmail,
      tipoUsuarioId: tipoUsuarioId || undefined,
      instituicaoId: instituicaoId || undefined,
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
    clearAuth();
  },

  async getCurrentUser(): Promise<User | null> {
    const token = getAuthToken();
    if (!token) {
      clearAuthSession();
      return null;
    }

    const payload = parseJwtPayload(token);
    if (!payload) {
      clearAuth();
      return null;
    }

    const exp = typeof payload.exp === 'number' ? payload.exp : null;
    if (exp && Date.now() >= exp * 1000) {
      clearAuth();
      return null;
    }

    const id = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const nome = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const session = getAuthSession();

    return {
      id: session?.usuarioId || (typeof id === 'string' ? id : undefined),
      email: session?.email || (typeof email === 'string' ? email : undefined),
      name: typeof nome === 'string' && nome ? nome : 'Usuário',
      tipoUsuarioId: session?.tipoUsuarioId || undefined,
      instituicaoId: session?.instituicaoId || undefined,
    };
  },
};
