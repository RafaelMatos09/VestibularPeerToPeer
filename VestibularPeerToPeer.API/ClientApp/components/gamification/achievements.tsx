'use client';

import { Award, Lock } from 'lucide-react';

interface AchievementsProps {
  badges: string[];
}

export function Achievements({ badges }: AchievementsProps) {
  const lockedBadges = 3;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Suas Conquistas</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="rounded-lg border-2 border-primary/40 bg-accent/30 p-4 text-center"
          >
            <Award className="mx-auto mb-2 text-primary" size={32} />
            <p className="font-semibold text-foreground">{badge}</p>
          </div>
        ))}
        {Array.from({ length: lockedBadges }).map((_, index) => (
          <div
            key={`locked-${index}`}
            className="rounded-lg border-2 border-border bg-muted/30 p-4 text-center opacity-50"
          >
            <Lock className="mx-auto mb-2 text-muted-foreground" size={32} />
            <p className="font-semibold text-muted-foreground">Bloqueado</p>
          </div>
        ))}
      </div>
    </div>
  );
}
