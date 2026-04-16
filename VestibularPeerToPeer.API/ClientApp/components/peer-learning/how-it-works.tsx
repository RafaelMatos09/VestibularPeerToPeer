'use client';

export function HowItWorks() {
  const rules = [
    { value: '+3', description: 'Pontos ao avaliar um colega' },
    { value: '-3', description: 'Pontos para agendar avaliação' },
    { value: '≥3', description: 'Mínimo para ser avaliado' },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-3">Como Funciona?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rules.map((rule, index) => (
          <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold mb-2">{rule.value}</div>
            <p className="text-sm">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
