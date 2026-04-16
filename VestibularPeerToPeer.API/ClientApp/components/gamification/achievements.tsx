'use client';

import { Award, Lock } from 'lucide-react';

interface AchievementsProps {
  badges: string[];
}

export function Achievements({ badges }: AchievementsProps) {
  const lockedBadges = 3;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Suas Conquistas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-4 text-center"
          >
            <Award className="text-yellow-600 mx-auto mb-2" size={32} />
            <p className="font-semibold text-gray-800">{badge}</p>
          </div>
        ))}
        {Array.from({ length: lockedBadges }).map((_, index) => (
          <div
            key={`locked-${index}`}
            className="border-2 border-gray-200 bg-gray-50 rounded-lg p-4 text-center opacity-50"
          >
            <Lock className="text-gray-400 mx-auto mb-2" size={32} />
            <p className="font-semibold text-gray-500">Bloqueado</p>
          </div>
        ))}
      </div>
    </div>
  );
}
