'use client';

export function HowItWorks() {
  const rules = [
    { value: '+3', description: 'Pontos ao avaliar um colega' },
    { value: '-3', description: 'Pontos para agendar avaliação' },
    { value: '≥3', description: 'Mínimo para ser avaliado' },
  ];

  return (
    <div className="rounded-xl border border-primary/20 bg-card p-6">
      <h2 className="mb-3 text-2xl font-bold text-foreground">Como Funciona?</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {rules.map((rule, index) => (
          <div key={index} className="rounded-lg border border-border bg-accent/30 p-4">
            <div className="mb-2 text-3xl font-bold text-primary">{rule.value}</div>
            <p className="text-sm text-muted-foreground">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
