'use client';

import { BookOpen, Video, FileText, Trophy, Star, Award } from 'lucide-react';
import { useGamification } from '@/contexts/gamification-context';
import { StatsCards } from './stats-cards';
import { NextClasses } from './next-classes';
import { PeerLearningCard } from './peer-learning-card';

export function Dashboard() {
  const { gamification, peerPoints } = useGamification();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-lg">
            <Star className="text-yellow-600" size={20} />
            <span className="font-semibold text-yellow-800">
              {gamification.points} pontos
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-lg">
            <Award className="text-purple-600" size={20} />
            <span className="font-semibold text-purple-800">
              Nível {gamification.level}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NextClasses />
        <PeerLearningCard peerPoints={peerPoints} />
      </div>
    </div>
  );
}
