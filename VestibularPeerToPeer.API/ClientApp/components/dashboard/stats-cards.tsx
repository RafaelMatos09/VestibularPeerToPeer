'use client';

import { BookOpen, Video, FileText, Trophy } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  gradient: string;
  textColor: string;
}

function StatCard({ icon, value, label, gradient, textColor }: StatCardProps) {
  return (
    <div className={`${gradient} rounded-xl p-6 text-white`}>
      {icon}
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className={textColor}>{label}</p>
    </div>
  );
}

export function StatsCards() {
  const stats = [
    {
      icon: <BookOpen size={32} className="mb-3" />,
      value: 12,
      label: 'Disciplinas Ativas',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-100',
    },
    {
      icon: <Video size={32} className="mb-3" />,
      value: 48,
      label: 'Aulas Concluídas',
      gradient: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-100',
    },
    {
      icon: <FileText size={32} className="mb-3" />,
      value: 156,
      label: 'Exercícios Resolvidos',
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',
      textColor: 'text-orange-100',
    },
    {
      icon: <Trophy size={32} className="mb-3" />,
      value: 3,
      label: 'Simulados Feitos',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
