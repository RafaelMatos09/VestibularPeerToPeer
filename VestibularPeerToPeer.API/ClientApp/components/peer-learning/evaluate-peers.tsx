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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Avaliar Colegas</h2>
      <div className="space-y-3">
        {pendingEvaluations.map((evaluation, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{evaluation.name}</p>
                <p className="text-sm text-gray-600">{evaluation.subject}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {evaluation.type} • {evaluation.questions} questões
                </p>
              </div>
              <button
                onClick={handleEvaluate}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
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
