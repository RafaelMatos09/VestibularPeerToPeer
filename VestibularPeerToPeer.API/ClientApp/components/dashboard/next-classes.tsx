'use client';

import { Video } from 'lucide-react';

const classes = [
  { name: 'Matemática - Funções', time: '14:00' },
  { name: 'Física - Cinemática', time: '15:00' },
  { name: 'Química - Ligações', time: '16:00' },
];

export function NextClasses() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Próximas Aulas</h2>
      <div className="space-y-3">
        {classes.map((aula, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Video className="text-primary" size={20} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{aula.name}</p>
                <p className="text-sm text-muted-foreground">Hoje às {aula.time}</p>
              </div>
            </div>
            <button className="font-semibold text-primary hover:text-primary/80">
              Assistir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
