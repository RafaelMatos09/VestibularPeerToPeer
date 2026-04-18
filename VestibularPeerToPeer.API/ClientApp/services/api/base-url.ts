/**
 * URL base da API .NET. Em dev, o Next.js reescreve `/api/*` para o backend (veja next.config.mjs).
 * Se precisar apontar para outro host, defina NEXT_PUBLIC_API_URL.
 */
export function getApiBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  return '';
}
