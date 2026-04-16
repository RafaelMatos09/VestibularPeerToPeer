'use client';

import Link from 'next/link';

interface PeerLearningCardProps {
  peerPoints: number;
}

export function PeerLearningCard({ peerPoints }: PeerLearningCardProps) {
  const minPointsRequired = 3;
  const progressPercentage = Math.min((peerPoints / minPointsRequired) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Peer Learning</h2>
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Seus Pontos P2P</span>
          <span className="text-2xl font-bold text-indigo-600">{peerPoints}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600">
          {peerPoints >= minPointsRequired
            ? 'Você pode agendar uma avaliação!'
            : `Faltam ${minPointsRequired - peerPoints} pontos para agendar`}
        </p>
      </div>
      <Link
        href="/peer-learning"
        className="block w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
      >
        Ver Avaliações Pendentes
      </Link>
    </div>
  );
}
