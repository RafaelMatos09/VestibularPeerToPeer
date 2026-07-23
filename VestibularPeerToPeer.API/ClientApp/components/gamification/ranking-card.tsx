'use client';

import { Trophy } from 'lucide-react';

interface RankingCardProps {
  ranking: number;
}

export function RankingCard({ ranking }: RankingCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Ranking</h2>
      <div className="text-center">
        <Trophy className="mx-auto mb-3 text-primary" size={48} />
        <div className="mb-1 text-4xl font-bold text-foreground">#{ranking}</div>
        <p className="text-muted-foreground">Posição Global</p>
      </div>
    </div>
  );
}
