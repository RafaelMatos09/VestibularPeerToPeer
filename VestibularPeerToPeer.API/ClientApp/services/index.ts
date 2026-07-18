// Exporta todos os serviços
// Adicione novos serviços aqui conforme necessário

export { authService } from './auth';
export { getAuthSession, setAuthSession, clearAuthSession } from './auth-session';
export type { AuthSession } from './auth-session';
export { gamificationService } from './gamification';

// TODO: Adicionar mais serviços conforme necessário:
// export { userService } from './users';
// export { subjectService } from './subjects';
// export { classService } from './classes';
// export { exerciseService } from './exercises';
// export { examService } from './exams';
// export { chatService } from './chat';
