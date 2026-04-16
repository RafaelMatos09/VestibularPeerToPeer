'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useGamification } from '@/contexts/gamification-context';
import { gamificationService } from '@/services/gamification';
import type { ScheduledEvaluation } from '@/types';

export function ScheduledEvaluations() {
  const { peerPoints } = useGamification();
  const [evaluations, setEvaluations] = useState<ScheduledEvaluation[]>([]);
  const minPointsRequired = 3;

  useEffect(() => {
    const loadEvaluations = async () => {
      const data = await gamificationService.getScheduledEvaluations();
      setEvaluations(data);
    };
    loadEvaluations();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Minhas Avaliações Agendadas
      </h2>
      <div className="space-y-3">
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">{evaluation.student}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  evaluation.type === 'Prova'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {evaluation.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{evaluation.subject}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock size={14} />
              <span>
                {evaluation.date} às {evaluation.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        disabled={peerPoints < minPointsRequired}
        className={`w-full mt-4 py-3 rounded-lg font-semibold transition ${
          peerPoints >= minPointsRequired
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {peerPoints >= minPointsRequired
          ? 'Agendar Nova Avaliação'
          : `Precisa de ${minPointsRequired - peerPoints} pontos`}
      </button>
    </div>
  );
}
