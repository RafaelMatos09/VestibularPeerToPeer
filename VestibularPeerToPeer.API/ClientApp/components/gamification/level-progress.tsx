'use client';

interface LevelProgressProps {
  level: number;
  points: number;
}

export function LevelProgress({ level, points }: LevelProgressProps) {
  const maxPoints = 100;
  const progressPercentage = Math.min((points / maxPoints) * 100, 100);

  return (
    <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Nível {level}</h2>
          <p className="text-purple-200">Estudante Dedicado</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{points}</div>
          <div className="text-purple-200">pontos</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso para Nível {level + 1}</span>
          <span>
            {points}/{maxPoints}
          </span>
        </div>
        <div className="w-full bg-purple-900/50 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
