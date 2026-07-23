'use client';

import { useState, useEffect } from 'react';
import { gamificationService } from '@/services/gamification';

interface Student {
  name: string;
  points: number;
}

export function TopStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const loadTopStudents = async () => {
      const data = await gamificationService.getTopStudents(10);
      setStudents(data);
    };
    loadTopStudents();
  }, []);

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 0:
        return 'bg-primary text-primary-foreground';
      case 1:
        return 'bg-muted text-muted-foreground';
      case 2:
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-bold text-foreground">Top 10 Estudantes</h2>
      <div className="space-y-3">
        {students.map((student, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${getPositionStyle(
                  index
                )}`}
              >
                {index + 1}
              </div>
              <span className="font-semibold text-foreground">{student.name}</span>
            </div>
            <span className="font-semibold text-muted-foreground">{student.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
