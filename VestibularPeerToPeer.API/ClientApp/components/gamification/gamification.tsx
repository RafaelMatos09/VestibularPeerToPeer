'use client';

import { useGamification } from '@/contexts/gamification-context';
import { LevelProgress } from './level-progress';
import { RankingCard } from './ranking-card';
import { Achievements } from './achievements';
import { TopStudents } from './top-students';

export function Gamification() {
  const { gamification } = useGamification();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Gamificação</h1>

      {/* Level and Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LevelProgress
          level={gamification.level}
          points={gamification.points}
        />
        <RankingCard ranking={gamification.ranking} />
      </div>

      {/* Achievements */}
      <Achievements badges={gamification.badges} />

      {/* Top Students */}
      <TopStudents />
    </div>
  );
}
