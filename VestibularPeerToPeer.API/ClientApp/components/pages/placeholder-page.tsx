'use client';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600 mt-4">
        Esta página está em construção. Implemente o conteúdo conforme necessário.
      </p>
    </div>
  );
}
