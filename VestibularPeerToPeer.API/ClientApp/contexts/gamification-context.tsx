'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Gamification, GamificationContextType } from '@/types';
import { gamificationService } from '@/services/gamification';

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const defaultGamification: Gamification = {
  points: 0,
  level: 1,
  badges: [],
  ranking: 0,
};

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [gamification, setGamification] = useState<Gamification>(defaultGamification);
  const [peerPoints, setPeerPoints] = useState(0);

  useEffect(() => {
    const loadGamificationData = async () => {
      try {
        const data = await gamificationService.getGamificationData();
        setGamification(data);
        const points = await gamificationService.getPeerPoints();
        setPeerPoints(points);
      } catch (error) {
        console.error('Erro ao carregar dados de gamificação:', error);
      }
    };
    loadGamificationData();
  }, []);

  const addPeerPoints = useCallback((points: number) => {
    setPeerPoints((prev) => prev + points);
  }, []);

  const subtractPeerPoints = useCallback((points: number) => {
    setPeerPoints((prev) => Math.max(0, prev - points));
  }, []);

  const addPoints = useCallback((points: number) => {
    setGamification((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        gamification,
        peerPoints,
        addPeerPoints,
        subtractPeerPoints,
        addPoints,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification deve ser usado dentro de um GamificationProvider');
  }
  return context;
}
