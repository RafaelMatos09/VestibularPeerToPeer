// Types para o sistema VestibularComunitario

export interface User {
  id?: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface Gamification {
  points: number;
  level: number;
  badges: string[];
  ranking: number;
}

export interface ScheduledEvaluation {
  id: number;
  student: string;
  subject: string;
  date: string;
  time: string;
  type: 'Prova' | 'Exercício';
}

export interface SidebarItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  path: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface GamificationContextType {
  gamification: Gamification;
  peerPoints: number;
  addPeerPoints: (points: number) => void;
  subtractPeerPoints: (points: number) => void;
  addPoints: (points: number) => void;
}
