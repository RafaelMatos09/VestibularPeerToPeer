import {
  Home,
  Users,
  BookOpen,
  Video,
  FileText,
  Trophy,
  MessageSquare,
  Calendar,
  Award,
} from 'lucide-react';
import type { SidebarItem } from '@/types';

// Configuração das rotas do sidebar
// Adicione ou remova itens aqui para modificar o menu
export const sidebarItems: SidebarItem[] = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Profile', path: '/usuarios' },
  { icon: BookOpen, label: 'Disciplinas', path: '/disciplinas' },
  { icon: Video, label: 'Aulas', path: '/aulas' },
  { icon: FileText, label: 'Exercícios', path: '/exercicios' },
  { icon: Trophy, label: 'Simulados', path: '/simulados' },
  { icon: Calendar, label: 'Peer Learning', path: '/peer-learning' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Award, label: 'Gamificação', path: '/gamificacao' },
];

// Rotas públicas (não requerem autenticação)
export const publicRoutes = ['/login', '/register'];

// Rota padrão após login
export const defaultAuthenticatedRoute = '/dashboard';

// Rota padrão para usuários não autenticados
export const defaultPublicRoute = '/login';
