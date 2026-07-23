'use client';

import { Star } from 'lucide-react';
import { useGamification } from '@/contexts/gamification-context';
import { HowItWorks } from './how-it-works';
import { ScheduledEvaluations } from './scheduled-evaluations';
import { EvaluatePeers } from './evaluate-peers';

export function PeerLearning() {
  const { peerPoints } = useGamification();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Peer-to-Peer Learning</h1>
        <div className="flex items-center space-x-2 rounded-lg border border-border bg-accent px-4 py-2">
          <Star className="text-primary" size={20} />
          <span className="font-semibold text-accent-foreground">{peerPoints} Pontos P2P</span>
        </div>
      </div>

      {/* How It Works */}
      <HowItWorks />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduledEvaluations />
        <EvaluatePeers />
      </div>
    </div>
  );
}
