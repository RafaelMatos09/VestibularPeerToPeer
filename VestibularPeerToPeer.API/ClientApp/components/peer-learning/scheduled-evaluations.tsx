'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useGamification } from '@/contexts/gamification-context';
import { useAuth } from '@/contexts/auth-context';
import { gamificationService } from '@/services/gamification';
import {
  disciplinaService,
  type AvaliacaoUsuarioDto,
} from '@/services/disciplina.service';
import type { ScheduledEvaluation } from '@/types';
import ModalAgendarAvaliacao, {
  type AlunoAvaliacao,
  type MarcadorCalendarioAvaliacao,
} from './ModalAgendarAvaliacao';

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

/** Substituir por aluno escolhido na API / fluxo de pares quando estiver disponível */
const AGENDAMENTO_ALUNO_PLACEHOLDER: AlunoAvaliacao = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'aluno@exemplo.com',
  nome: 'Aluno (aguardando integração)',
  ultimoAcesso: null,
  alunoAvaliadoId: '00000000-0000-0000-0000-000000000002',
  alunoAvaliadorId: 'a4ccd2e9-7763-4062-bed5-be6dbcac9b92',
  exercicioId: 1,
  notaExercicio: 4,
  notaComportamentoAvaliado: 4,
  notaComportamentoAvaliador: 5,
  notaTotal: 4.33,
};

function mapDtoToAluno(a: AvaliacaoUsuarioDto): AlunoAvaliacao {
  return {
    id: a.alunoAvaliadoId,
    email: a.email,
    nome: a.nome,
    ultimoAcesso: a.ultimoAcesso,
    alunoAvaliadoId: a.alunoAvaliadoId,
    alunoAvaliadorId: a.alunoAvaliadorId,
    exercicioId: a.exercicioId,
    notaExercicio: Number(a.notaExercicio ?? 0),
    notaComportamentoAvaliado: Number(a.notaComportamentoAvaliado ?? 0),
    notaComportamentoAvaliador: Number(a.notaComportamentoAvaliador ?? 0),
    notaTotal: Number(a.notaTotal ?? 0),
  };
}

function dtoParaMarcadorCalendario(a: AvaliacaoUsuarioDto): MarcadorCalendarioAvaliacao {
  const temAluno =
    !!a.alunoAvaliadoId &&
    a.alunoAvaliadoId.replace(/[{}]/g, '').toLowerCase() !== EMPTY_GUID;
  return {
    exercicioId: a.exercicioId,
    alunoAvaliadoId: a.alunoAvaliadoId,
    /** Verde: aluno definido e notas lançadas; âmbar: interação sem nota total */
    avaliado: temAluno && a.notaTotal != null,
  };
}

export function ScheduledEvaluations() {
  const { peerPoints } = useGamification();
  const { user } = useAuth();
  const [evaluations, setEvaluations] = useState<ScheduledEvaluation[]>([]);
  const [minhasAvaliacoes, setMinhasAvaliacoes] = useState<AvaliacaoUsuarioDto[]>([]);
  const [carregandoAvaliacoes, setCarregandoAvaliacoes] = useState(false);
  const minPointsRequired = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalModo, setModalModo] = useState<'agendar' | 'visualizar'>('agendar');
  const [selectedAluno, setSelectedAluno] = useState<AlunoAvaliacao | null>(null);
  const [notasPendentesVisualizacao, setNotasPendentesVisualizacao] = useState(false);

  useEffect(() => {
    const loadEvaluations = async () => {
      const data = await gamificationService.getScheduledEvaluations();
      setEvaluations(data);
    };
    loadEvaluations();
  }, []);

  useEffect(() => {
    if (!user?.id) {
      setMinhasAvaliacoes([]);
      return;
    }
    let cancelado = false;
    (async () => {
      setCarregandoAvaliacoes(true);
      try {
        const data = await disciplinaService.listarAvaliacoesPorAvaliador(AGENDAMENTO_ALUNO_PLACEHOLDER.alunoAvaliadorId);
        if (!cancelado) setMinhasAvaliacoes(data);
      } catch {
        if (!cancelado) setMinhasAvaliacoes([]);
      } finally {
        if (!cancelado) setCarregandoAvaliacoes(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [user?.id]);

  const handleOpenModalAgendar = () => {
    setModalModo('agendar');
    setNotasPendentesVisualizacao(false);
    setSelectedAluno(AGENDAMENTO_ALUNO_PLACEHOLDER);
    setIsModalOpen(true);
  };

  const abrirVisualizacao = (dto: AvaliacaoUsuarioDto) => {
    setModalModo('visualizar');
    setNotasPendentesVisualizacao(dto.notaTotal == null);
    setSelectedAluno(mapDtoToAluno(dto));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAluno(null);
    setModalModo('agendar');
    setNotasPendentesVisualizacao(false);
  };

  const marcadoresCalendario = minhasAvaliacoes.map(dtoParaMarcadorCalendario);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">
        Minhas Avaliações Agendadas
      </h2>

      <div className="mb-6">
        <h3 className="mb-2 text-sm font-semibold text-foreground">
          Avaliações como avaliador (exercícios)
        </h3>
        {!user?.id && (
          <p className="text-sm text-muted-foreground">Faça login para ver suas avaliações.</p>
        )}
        {user?.id && carregandoAvaliacoes && (
          <p className="text-sm text-muted-foreground">Carregando avaliações…</p>
        )}
        {user?.id && !carregandoAvaliacoes && minhasAvaliacoes.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhuma avaliação encontrada para seu usuário.</p>
        )}
        <ul className="max-h-48 space-y-2 overflow-y-auto">
          {minhasAvaliacoes.map((av) => {
            const key = `${av.alunoAvaliadoId}-${av.exercicioId}`;
            const temAluno =
              !!av.alunoAvaliadoId &&
              av.alunoAvaliadoId.replace(/[{}]/g, '').toLowerCase() !== EMPTY_GUID;
            const comNotas = temAluno && av.notaTotal != null;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => abrirVisualizacao(av)}
                  className="flex w-full items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-left transition hover:border-primary/40 hover:bg-accent/30"
                >
                  <span className="font-medium text-foreground">
                    Ex. #{av.exercicioId} — {av.nome}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      comNotas
                        ? 'bg-primary/20 text-primary'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {comNotas ? 'Avaliado' : 'Pendente'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-3">
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="rounded-lg border border-border p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-foreground">{evaluation.student}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  evaluation.type === 'Prova'
                    ? 'bg-destructive/20 text-destructive'
                    : 'bg-primary/20 text-primary'
                }`}
              >
                {evaluation.type}
              </span>
            </div>
            <p className="mb-1 text-sm text-muted-foreground">{evaluation.subject}</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock size={14} />
              <span>
                {evaluation.date} às {evaluation.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleOpenModalAgendar}
        disabled={peerPoints < minPointsRequired}
        className={`mt-4 w-full rounded-lg py-3 font-semibold transition ${
          peerPoints >= minPointsRequired
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'cursor-not-allowed bg-muted text-muted-foreground'
        }`}
      >
        {peerPoints >= minPointsRequired
          ? 'Agendar Nova Avaliação'
          : `Precisa de ${minPointsRequired - peerPoints} pontos`}
      </button>

      {selectedAluno && (
        <ModalAgendarAvaliacao
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          aluno={selectedAluno}
          modo={modalModo}
          marcadoresCalendario={
            modalModo === 'visualizar' ? marcadoresCalendario : []
          }
          notasPendentes={modalModo === 'visualizar' ? notasPendentesVisualizacao : false}
        />
      )}
    </div>
  );
}
