'use client';

interface LevelProgressProps {
  level: number;
  points: number;
}

export function LevelProgress({ level, points }: LevelProgressProps) {
  const maxPoints = 100;
  const progressPercentage = Math.min((points / maxPoints) * 100, 100);

  return (
    <div className="rounded-xl border border-primary/20 bg-card p-6 lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Nível {level}</h2>
          <p className="text-muted-foreground">Estudante Dedicado</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-primary">{points}</div>
          <div className="text-muted-foreground">pontos</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progresso para Nível {level + 1}</span>
          <span>
            {points}/{maxPoints}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-muted">
          <div
            className="h-3 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
