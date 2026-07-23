'use client';

import Link from 'next/link';

interface PeerLearningCardProps {
  peerPoints: number;
}

export function PeerLearningCard({ peerPoints }: PeerLearningCardProps) {
  const minPointsRequired = 3;
  const progressPercentage = Math.min((peerPoints / minPointsRequired) * 100, 100);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Peer Learning</h2>
      <div className="mb-4 rounded-lg border border-border bg-accent/50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Seus Pontos P2P</span>
          <span className="text-2xl font-bold text-primary">{peerPoints}</span>
        </div>
        <div className="mb-2 h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {peerPoints >= minPointsRequired
            ? 'Você pode agendar uma avaliação!'
            : `Faltam ${minPointsRequired - peerPoints} pontos para agendar`}
        </p>
      </div>
      <Link
        href="/peer-learning"
        className="block w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Ver Avaliações Pendentes
      </Link>
    </div>
  );
}
