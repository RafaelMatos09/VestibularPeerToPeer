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
        return 'bg-yellow-400 text-yellow-900';
      case 1:
        return 'bg-gray-300 text-gray-700';
      case 2:
        return 'bg-orange-400 text-orange-900';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Top 10 Estudantes</h2>
      <div className="space-y-3">
        {students.map((student, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getPositionStyle(
                  index
                )}`}
              >
                {index + 1}
              </div>
              <span className="font-semibold text-gray-800">{student.name}</span>
            </div>
            <span className="text-gray-600 font-semibold">{student.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
