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

export type MarcadorCalendarioAvaliacao = {
  exercicioId: number;
  alunoAvaliadoId: string;
  /** true quando há notas (notaTotal) e interação válida */
  avaliado: boolean;
};

interface ModalAgendarAvaliacaoProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: AlunoAvaliacao;
  onConfirm?: (data: { date: Date; time: string }) => void;
  /** visualizar = só consulta notas + marcadores; agendar = fluxo atual */
  modo?: "agendar" | "visualizar";
  marcadoresCalendario?: MarcadorCalendarioAvaliacao[];
  /** true quando a API retornou notaTotal nulo (exibir painel como pendente) */
  notasPendentes?: boolean;
}

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];
const WEEKDAYS = ["D","S","T","Q","Q","S","S"];
const TIME_SLOTS = ["08:00","09:30","11:00","14:00","15:30","17:00"];

/** Dia exibido no mês (sem data na API — alinha exercício + aluno para o badge) */
export function diaCalendarioParaItem(
  year: number,
  month: number,
  exercicioId: number,
  alunoAvaliadoId: string
): number {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let h = 0;
  for (let i = 0; i < alunoAvaliadoId.length; i++) h += alunoAvaliadoId.charCodeAt(i);
  return ((exercicioId * 17 + h) % daysInMonth) + 1;
}

function ScoreBar({
  label,
  score,
  max,
  pendente,
}: {
  label: string;
  score: number;
  max: number;
  pendente?: boolean;
}) {
  const pct = pendente ? 0 : (score / max) * 100;
  const color = pct >= 90 ? "#10b981" : pct >= 70 ? "#7c3aed" : "#f59e0b";
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-bold text-white">
          {pendente ? "—" : (
            <>
              {score}<span className="text-gray-500 font-normal">/{max}</span>
            </>
          )}
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

function ScoreRing({
  score,
  max = 5,
  pendente,
}: {
  score: number;
  max?: number;
  pendente?: boolean;
}) {
  if (pendente) {
    return (
      <div
        className="flex items-center justify-center w-[72px] h-[72px] rounded-full text-[10px] text-center leading-tight text-gray-400 px-1"
        style={{ border: "2px solid rgba(255,255,255,0.08)" }}
      >
        Notas pendentes
      </div>
    );
  }
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
  modo = "agendar",
  marcadoresCalendario = [],
  notasPendentes = false,
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

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  useEffect(() => {
    if (!isOpen || modo !== "visualizar") return;
    const day = diaCalendarioParaItem(year, month, aluno.exercicioId, aluno.alunoAvaliadoId);
    setSelectedDate(new Date(year, month, day));
  }, [isOpen, modo, aluno.exercicioId, aluno.alunoAvaliadoId, year, month]);

  if (!isOpen) return null;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleDayClick = (day: number) => {
    if (modo === "visualizar") return;
    const date = new Date(year, month, day);
    if (date < today) return;
    setSelectedDate(date);
  };

  const marcadoresNoDia = (day: number) =>
    marcadoresCalendario.filter(
      (m) =>
        diaCalendarioParaItem(year, month, m.exercicioId, m.alunoAvaliadoId) === day
    );

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
            <p className="text-xs uppercase tracking-widest text-purple-400 font-medium mb-1">
              {modo === "visualizar" ? "Visualização" : "Agendamento"}
            </p>
            <h2 className="text-2xl font-bold text-white leading-tight">
              {modo === "visualizar" ? "Avaliações no calendário" : "Cadastro de Avaliação"}
            </h2>
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

            {modo === "visualizar" && marcadoresCalendario.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mb-2 text-[10px] text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> Com notas
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500" /> Pendente / sem nota
                </span>
              </div>
            )}

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const date = new Date(year, month, day);
                const isPast = date < today;
                const isToday = date.getTime() === today.getTime();
                const isSel = selectedDate?.getTime() === date.getTime();
                const marcadores = marcadoresNoDia(day);
                return (
                  <div
                    key={i}
                    onClick={() => handleDayClick(day)}
                    className={`
                      rounded-lg text-center py-1 text-xs transition-all select-none min-h-[2.25rem] flex flex-col items-center justify-start
                      ${isPast && modo === "agendar" ? "text-gray-600 cursor-not-allowed" : modo === "visualizar" ? "cursor-default" : "cursor-pointer"}
                      ${isSel ? "bg-purple-600 text-white font-bold" : ""}
                      ${isToday && !isSel ? "text-purple-300 font-semibold" : ""}
                      ${!isSel && (!isPast || modo === "visualizar") && !isToday ? "text-gray-300 hover:bg-purple-500/20" : ""}
                      ${isPast && modo === "visualizar" ? "text-gray-400" : ""}
                    `}
                    style={isToday && !isSel ? { border: "1.5px solid #7c3aed" } : {}}
                  >
                    <span>{day}</span>
                    {marcadores.length > 0 && (
                      <div className="flex justify-center gap-0.5 mt-0.5 flex-wrap px-0.5">
                        {marcadores.slice(0, 4).map((m, mi) => (
                          <span
                            key={`${m.alunoAvaliadoId}-${m.exercicioId}-${mi}`}
                            className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: m.avaliado ? "#10b981" : "#f59e0b" }}
                            title={m.avaliado ? "Com notas (avaliação registrada)" : "Pendente de nota"}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time slots */}
            {modo === "agendar" && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">Horário disponível</p>
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
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
            )}
          </div>

          {/* RIGHT: Dashboard */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">Desempenho do Aluno</p>

            {/* Score ring card */}
            <div
              className="flex items-center gap-4 rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <ScoreRing score={aluno.notaTotal} pendente={notasPendentes} />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Nota Total</p>
                <p className="text-2xl font-bold text-white leading-none">
                  {notasPendentes ? "—" : aluno.notaTotal.toFixed(2)}
                </p>
                <p className="text-xs text-purple-400 mt-1">
                  {notasPendentes
                    ? "⏳ Aguardando lançamento de notas"
                    : "⭐ Excelente desempenho"}
                </p>
              </div>
            </div>

            {/* Bars */}
            <div
              className="rounded-xl p-3 flex flex-col gap-2.5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <ScoreBar label="Exercício" score={aluno.notaExercicio} max={5} pendente={notasPendentes} />
              <ScoreBar label="Comp. Avaliado" score={aluno.notaComportamentoAvaliado} max={5} pendente={notasPendentes} />
              <ScoreBar label="Comp. Avaliador" score={aluno.notaComportamentoAvaliador} max={5} pendente={notasPendentes} />
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

            {/* Confirm / Fechar */}
            {modo === "agendar" ? (
            <button
              type="button"
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
            ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl py-3 text-sm font-semibold tracking-wide text-white mt-auto transition-all"
              style={{
                background: "linear-gradient(135deg,#4b5563,#6b7280)",
              }}
            >
              Fechar
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}