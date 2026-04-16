'use client';

import { Video } from 'lucide-react';

const classes = [
  { name: 'Matemática - Funções', time: '14:00' },
  { name: 'Física - Cinemática', time: '15:00' },
  { name: 'Química - Ligações', time: '16:00' },
];

export function NextClasses() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Próximas Aulas</h2>
      <div className="space-y-3">
        {classes.map((aula, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{aula.name}</p>
                <p className="text-sm text-gray-500">Hoje às {aula.time}</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              Assistir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
