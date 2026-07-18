import type { User } from '@/types';
import { fetchJson } from './api/fetch-json';

export type CadastrarUsuarioPayload = {
  nome: string;
  email: string;
  senha: string;
};

type CadastrarUsuarioResponse = {
  id?: string;
  nome: string;
  email: string;
};

export const usuarioService = {
  async cadastrar(payload: CadastrarUsuarioPayload): Promise<User> {
    const res = await fetchJson<CadastrarUsuarioResponse>('/api/usuarios/cadastrar', {
      method: 'POST',
      body: payload,
    });
    return {
      id: res.id,
      name: res.nome,
      email: res.email,
    };
  },
  
};
