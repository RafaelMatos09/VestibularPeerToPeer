import type { Gamification, ScheduledEvaluation } from '@/types';

// Serviço de gamificação
// TODO: Substituir pela integração real com seu backend

export const gamificationService = {
  async getGamificationData(): Promise<Gamification> {
    // TODO: Implementar chamada real à API
    // const response = await fetch('/api/gamification');
    // return response.json();

    // Mock para desenvolvimento
    return {
      points: 45,
      level: 3,
      badges: ['Primeiro Login', 'Avaliador Bronze', 'Estudante Dedicado'],
      ranking: 127,
    };
  },

  async getPeerPoints(): Promise<number> {
    // TODO: Implementar chamada real à API
    return 6;
  },

  async addPeerPoints(userId: string, points: number): Promise<number> {
    // TODO: Implementar chamada real à API
    // const response = await fetch('/api/peer-points/add', {
    //   method: 'POST',
    //   body: JSON.stringify({ userId, points }),
    // });
    // return response.json();

    return points;
  },

  async getScheduledEvaluations(): Promise<ScheduledEvaluation[]> {
    // TODO: Implementar chamada real à API
    return [
      {
        id: 1,
        student: 'Maria Silva',
        subject: 'Matemática',
        date: '2026-01-05',
        time: '14:00',
        type: 'Prova',
      },
      {
        id: 2,
        student: 'João Santos',
        subject: 'Física',
        date: '2026-01-06',
        time: '16:00',
        type: 'Exercício',
      },
    ];
  },

  async getTopStudents(limit: number = 10): Promise<{ name: string; points: number }[]> {
    // TODO: Implementar chamada real à API
    return Array.from({ length: limit }).map((_, i) => ({
      name: `Estudante ${i + 1}`,
      points: Math.floor(Math.random() * 500 + 500),
    }));
  },
};
