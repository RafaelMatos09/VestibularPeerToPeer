'use client';

import { useGamification } from '@/contexts/gamification-context';

const pendingEvaluations = [
  { name: 'Ana Costa', subject: 'Matemática - Funções Quadráticas', type: 'Exercício', questions: 10 },
  { name: 'Pedro Oliveira', subject: 'Física - Cinemática', type: 'Exercício', questions: 8 },
  { name: 'Julia Santos', subject: 'Química - Ligações', type: 'Exercício', questions: 12 },
];

export function EvaluatePeers() {
  const { addPeerPoints } = useGamification();

  const handleEvaluate = () => {
    addPeerPoints(3);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Avaliar Colegas</h2>
      <div className="space-y-3">
        {pendingEvaluations.map((evaluation, index) => (
          <div key={index} className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{evaluation.name}</p>
                <p className="text-sm text-muted-foreground">{evaluation.subject}</p>
                <p className="mt-1 text-xs text-muted-foreground/80">
                  {evaluation.type} • {evaluation.questions} questões
                </p>
              </div>
              <button
                onClick={handleEvaluate}
                className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Avaliar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
