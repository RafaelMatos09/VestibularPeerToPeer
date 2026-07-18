import { fetchJson } from './api/fetch-json';

/** Espelha AvaliacaoUsuarioModel da API */
export type AvaliacaoUsuarioDto = {
  email: string;
  nome: string;
  ultimoAcesso: string | null;
  alunoAvaliadoId: string;
  alunoAvaliadorId: string;
  exercicioId: number;
  notaExercicio: number | null;
  notaComportamentoAvaliado: number | null;
  notaComportamentoAvaliador: number | null;
  notaTotal: number | null;
};

export const disciplinaService = {
  async listarAvaliacoesPorAvaliador(avaliadorId: string): Promise<AvaliacaoUsuarioDto[]> {
    const q = new URLSearchParams({ id: avaliadorId });
    return fetchJson<AvaliacaoUsuarioDto[]>(
      `/api/disciplina/get-avaliacao-usuario-id?${q.toString()}`
    );
  },
};
