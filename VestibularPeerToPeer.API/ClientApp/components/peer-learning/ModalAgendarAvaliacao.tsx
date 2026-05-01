import { UUID } from "crypto";
import { useState, useEffect } from "react";

export interface AlunoAvaliacao {
  id: string; // UUID
  email: string;
  nome: string;
  ultimoAcesso: string | null;
  alunoAvaliadoId: string;
  alunoAvaliadorId: string;
  exercicioId: number;
  notaExercicio: number;
  notaComportamentoAvaliado: number;
  notaComportamentoAvaliador: number;
  notaTotal: number;
}

interface ModalAgendarAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: AlunoAvaliacao;
  onConfirm?: (data: { date: Date; time: string }) => void;
}

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];
const WEEKDAYS = ["D","S","T","Q","Q","S","S"];
const TIME_SLOTS = ["08:00","09:30","11:00","14:00","15:30","17:00"];

function ScoreBar({ label, score, max }: { label: string; score: number; max: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 90 ? "#10b981" : pct >= 70 ? "#7c3aed" : "#f59e0b";
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-bold text-white">
          {score}<span className="text-gray-500 font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function ScoreRing({ score, max = 5 }: { score: number; max?: number }) {
  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / max) * circumference;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <circle
        cx="36" cy="36" r={r} fill="none" stroke="#7c3aed" strokeWidth="6"
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 36 36)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="inherit">
        {score.toFixed(2)}
      </text>
    </svg>
  );
}

export default function ModalAgendarAvaliacao({
  isOpen,
  onClose,
  aluno,
  onConfirm,
}: ModalAgendarAvaliacaoProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(null);
      setSelectedSlot(null);
      setConfirmed(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleDayClick = (day: number) => {
    const date = new Date(year, month, day);
    if (date < today) return;
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;
    setConfirmed(true);
    onConfirm?.({ date: selectedDate, time: selectedSlot });
  };

  const selectedLabel = selectedDate
    ? selectedDate.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
      <div
        className="relative w-full max-w-2xl rounded-2xl p-6 text-white overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1a1d2e 0%,#0f1117 60%,#1a1225 100%)",
          boxShadow: "0 0 40px rgba(139,92,246,0.1),0 2px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Decorative blob */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: -60, right: -60, width: 180, height: 180,
            background: "radial-gradient(circle,rgba(139,92,246,0.18),transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-purple-400 font-medium mb-1">Agendamento</p>
            <h2 className="text-2xl font-bold text-white leading-tight">Cadastro de Avaliação</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            `👤 ${aluno.nome}`,
            `📧 ${aluno.email}`,
            `📘 Exercício #${aluno.exercicioId}`,
          ].map((chip) => (
            <span
              key={chip}
              className="text-xs px-3 py-1 rounded-full text-purple-300 font-medium"
              style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* LEFT: Calendar */}
          <div>
            {/* Month nav */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </button>
              <span className="text-sm font-semibold text-white tracking-wide">
                {MONTHS[month]} {year}
              </span>
              <button
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </button>
            </div>

            {/* Weekdays header */}
            <div className="grid grid-cols-7 mb-1">
              {WEEKDAYS.map((d, i) => (
                <div key={i} className="text-center text-xs text-gray-500 font-medium py-1">{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const date = new Date(year, month, day);
                const isPast = date < today;
                const isToday = date.getTime() === today.getTime();
                const isSel = selectedDate?.getTime() === date.getTime();
                return (
                  <div
                    key={i}
                    onClick={() => !isPast && handleDayClick(day)}
                    className={`
                      rounded-lg text-center py-1.5 text-xs transition-all select-none
                      ${isPast ? "text-gray-600 cursor-not-allowed" : "cursor-pointer"}
                      ${isSel ? "bg-purple-600 text-white font-bold" : ""}
                      ${isToday && !isSel ? "text-purple-300 font-semibold" : ""}
                      ${!isSel && !isPast && !isToday ? "text-gray-300 hover:bg-purple-500/20" : ""}
                    `}
                    style={isToday && !isSel ? { border: "1.5px solid #7c3aed" } : {}}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Time slots */}
            <div className="mt-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Horário disponível</p>
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedSlot(t)}
                    className={`
                      rounded-lg py-1.5 text-xs font-medium transition-all
                      ${selectedSlot === t
                        ? "text-purple-300"
                        : "text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10"
                      }
                    `}
                    style={{
                      border: selectedSlot === t
                        ? "1px solid #7c3aed"
                        : "1px solid rgba(255,255,255,0.08)",
                      background: selectedSlot === t ? "rgba(124,58,237,0.18)" : undefined,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Dashboard */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">Desempenho do Aluno</p>

            {/* Score ring card */}
            <div
              className="flex items-center gap-4 rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <ScoreRing score={aluno.notaTotal} />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Nota Total</p>
                <p className="text-2xl font-bold text-white leading-none">{aluno.notaTotal.toFixed(2)}</p>
                <p className="text-xs text-purple-400 mt-1">⭐ Excelente desempenho</p>
              </div>
            </div>

            {/* Bars */}
            <div
              className="rounded-xl p-3 flex flex-col gap-2.5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <ScoreBar label="Exercício" score={aluno.notaExercicio} max={5} />
              <ScoreBar label="Comp. Avaliado" score={aluno.notaComportamentoAvaliado} max={5} />
              <ScoreBar label="Comp. Avaliador" score={aluno.notaComportamentoAvaliador} max={5} />
            </div>

            {/* Selected date display */}
            <div
              className="rounded-xl p-3 text-center transition-all"
              style={{
                background: "rgba(88,28,235,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
                opacity: selectedDate ? 1 : 0.4,
              }}
            >
              <p className="text-xs text-gray-400 mb-1">Data selecionada</p>
              <p className="text-sm font-semibold text-purple-300 capitalize">
                {selectedLabel ?? "Nenhuma data"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {selectedSlot ? `🕐 ${selectedSlot}` : "—"}
              </p>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedSlot || confirmed}
              className="rounded-xl py-3 text-sm font-semibold tracking-wide text-white mt-auto transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: confirmed
                  ? "linear-gradient(135deg,#059669,#10b981)"
                  : "linear-gradient(135deg,#7c3aed,#a855f7)",
              }}
            >
              {confirmed ? "✓ Agendado com sucesso!" : "Confirmar Disponibilidade"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}