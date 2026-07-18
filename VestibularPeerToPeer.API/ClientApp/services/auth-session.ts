export type AuthSession = {
  usuarioId: string;
  tipoUsuarioId: string;
  instituicaoId: string;
  email: string;
};

const USUARIO_ID_KEY = 'usuario_id';
const TIPO_USUARIO_ID_KEY = 'tipo_usuario_id';
const INSTITUICAO_ID_KEY = 'instituicao_id';
const EMAIL_KEY = 'email';

function canUseStorage(): boolean {
  return typeof window !== 'undefined';
}

export function getAuthSession(): AuthSession | null {
  if (!canUseStorage()) return null;

  const usuarioId = localStorage.getItem(USUARIO_ID_KEY);
  const tipoUsuarioId = localStorage.getItem(TIPO_USUARIO_ID_KEY);
  const instituicaoId = localStorage.getItem(INSTITUICAO_ID_KEY);
  const email = localStorage.getItem(EMAIL_KEY);

  if (!usuarioId || !email) return null;

  return {
    usuarioId,
    tipoUsuarioId: tipoUsuarioId ?? '',
    instituicaoId: instituicaoId ?? '',
    email,
  };
}

export function setAuthSession(session: AuthSession): void {
  if (!canUseStorage()) return;

  localStorage.setItem(USUARIO_ID_KEY, session.usuarioId);
  localStorage.setItem(TIPO_USUARIO_ID_KEY, session.tipoUsuarioId);
  localStorage.setItem(INSTITUICAO_ID_KEY, session.instituicaoId);
  localStorage.setItem(EMAIL_KEY, session.email);
}

export function clearAuthSession(): void {
  if (!canUseStorage()) return;

  localStorage.removeItem(USUARIO_ID_KEY);
  localStorage.removeItem(TIPO_USUARIO_ID_KEY);
  localStorage.removeItem(INSTITUICAO_ID_KEY);
  localStorage.removeItem(EMAIL_KEY);
}
