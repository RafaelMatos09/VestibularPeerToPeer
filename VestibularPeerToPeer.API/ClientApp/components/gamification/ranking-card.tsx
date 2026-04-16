'use client';

import { Trophy } from 'lucide-react';

interface RankingCardProps {
  ranking: number;
}

export function RankingCard({ ranking }: RankingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Ranking</h2>
      <div className="text-center">
        <Trophy className="text-yellow-500 mx-auto mb-3" size={48} />
        <div className="text-4xl font-bold text-gray-800 mb-1">#{ranking}</div>
        <p className="text-gray-600">Posição Global</p>
      </div>
    </div>
  );
}
