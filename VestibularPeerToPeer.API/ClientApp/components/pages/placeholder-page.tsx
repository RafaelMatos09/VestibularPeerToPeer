'use client';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="mt-4 text-muted-foreground">
        Esta página está em construção. Implemente o conteúdo conforme necessário.
      </p>
    </div>
  );
}
