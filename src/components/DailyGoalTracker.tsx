import React, { useState, useEffect } from 'react';
import {
  Target,
  Clock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  SlidersHorizontal,
  Award,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Zap,
  Flame,
  BookOpen,
  Calendar,
  Save,
  Check
} from 'lucide-react';
import { UserStats } from '../types';

interface DailyGoalTrackerProps {
  stats: UserStats;
  onUpdateStats?: (updatedStats: UserStats) => void;
  onNavigateToQuestions?: () => void;
}

export const DailyGoalTracker: React.FC<DailyGoalTrackerProps> = ({
  stats,
  onUpdateStats,
  onNavigateToQuestions
}) => {
  // Goals configuration state
  const [goalType, setGoalType] = useState<'questions' | 'time' | 'both'>(
    stats.dailyGoalType || 'both'
  );
  const [targetQuestions, setTargetQuestions] = useState<number>(
    stats.dailyGoalQuestions || 15
  );
  const [targetStudyMinutes, setTargetStudyMinutes] = useState<number>(
    stats.dailyGoalStudyMinutes || 60
  );

  // Configuration panel toggle
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // Active study session timer
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);

  // Sync with incoming stats if they change
  useEffect(() => {
    if (stats.dailyGoalType) setGoalType(stats.dailyGoalType);
    if (stats.dailyGoalQuestions) setTargetQuestions(stats.dailyGoalQuestions);
    if (stats.dailyGoalStudyMinutes) setTargetStudyMinutes(stats.dailyGoalStudyMinutes);
  }, [stats.dailyGoalType, stats.dailyGoalQuestions, stats.dailyGoalStudyMinutes]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Current values
  const currentQuestions = stats.dailyQuestionsToday ?? 11;
  const currentMinutes = stats.studyTimeMinutesToday ?? 45;

  // Progress calculations
  const questionsPercent = Math.min(
    100,
    Math.round((currentQuestions / Math.max(1, targetQuestions)) * 100)
  );
  const timePercent = Math.min(
    100,
    Math.round((currentMinutes / Math.max(1, targetStudyMinutes)) * 100)
  );

  let overallPercent = 0;
  if (goalType === 'questions') {
    overallPercent = questionsPercent;
  } else if (goalType === 'time') {
    overallPercent = timePercent;
  } else {
    overallPercent = Math.round((questionsPercent + timePercent) / 2);
  }

  const isQuestionsMet = currentQuestions >= targetQuestions;
  const isTimeMet = currentMinutes >= targetStudyMinutes;
  const isOverallMet =
    goalType === 'questions'
      ? isQuestionsMet
      : goalType === 'time'
      ? isTimeMet
      : isQuestionsMet && isTimeMet;

  // Format minutes into hours and minutes
  const formatTimeStr = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0 && mins > 0) return `${hrs}h ${mins}min`;
    if (hrs > 0) return `${hrs}h`;
    return `${mins}min`;
  };

  // Format timer display
  const formatTimerSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Save changes
  const handleSavePreferences = () => {
    const updated: UserStats = {
      ...stats,
      dailyGoalType: goalType,
      dailyGoalQuestions: targetQuestions,
      dailyGoalStudyMinutes: targetStudyMinutes
    };

    if (onUpdateStats) {
      onUpdateStats(updated);
    }

    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      setIsConfigOpen(false);
    }, 1500);
  };

  // Add questions to today
  const handleAddQuestionCount = (amount: number) => {
    const updated: UserStats = {
      ...stats,
      dailyQuestionsToday: Math.max(0, currentQuestions + amount),
      totalQuestionsAnswered: stats.totalQuestionsAnswered + amount
    };
    if (onUpdateStats) {
      onUpdateStats(updated);
    }
  };

  // Add minutes to today
  const handleAddStudyMinutes = (amount: number) => {
    const updated: UserStats = {
      ...stats,
      studyTimeMinutesToday: Math.max(0, currentMinutes + amount)
    };
    if (onUpdateStats) {
      onUpdateStats(updated);
    }
  };

  // Commit recorded timer session
  const handleSaveTimerSession = () => {
    const minutesToAdd = Math.floor(sessionSeconds / 60);
    if (minutesToAdd > 0) {
      handleAddStudyMinutes(minutesToAdd);
    }
    setIsTimerRunning(false);
    setSessionSeconds(0);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-slate-50/80 via-white to-teal-50/30">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-100/70 text-teal-800">
              <Target className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Metas Diárias de Estudo & Desempenho
            </h2>
            {isOverallMet && (
              <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <Check className="w-3 h-3" />
                <span>Meta do Dia Atingida!</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Acompanhe o cumprimento diário da sua carga de questões e tempo líquido de estudo pré-definidos.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 border shadow-2xs w-full sm:w-auto cursor-pointer ${
              isConfigOpen
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isConfigOpen ? 'Fechar Configuração' : 'Configurar Metas Diárias'}</span>
          </button>
        </div>
      </div>

      {/* Save Success Toast banner */}
      {saveToast && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-6 flex items-center justify-center space-x-2 transition-all">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configuração de metas diárias atualizada com sucesso no seu perfil!</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. CONFIGURATION INTERFACE (Expandable or toggleable) */}
      {/* ========================================================================= */}
      {isConfigOpen && (
        <div className="p-6 sm:p-7 bg-slate-50 border-b border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                Painel de Ajustes da Mentoria
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Definir Parâmetros Diários de Produtividade
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Valores salvos automaticamente para seu ritmo de preparação
            </span>
          </div>

          {/* Goal Focus Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              1. Modo de Foco da Meta:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setGoalType('questions')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  goalType === 'questions'
                    ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500/20 text-teal-950'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-xs">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Apenas Questões</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Foco na resolução intensiva e aprendizado por distratores.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setGoalType('time')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  goalType === 'time'
                    ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500/20 text-teal-950'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-xs">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Apenas Tempo de Estudo</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Foco em horas líquidas dedicadas a leitura e revisão.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setGoalType('both')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  goalType === 'both'
                    ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500/20 text-teal-950'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Ambos Combinados (Recomendado)</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Equilíbrio ótimo entre volume prático e dedicação de tempo.
                </p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Setting: Daily Questions */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                goalType === 'time'
                  ? 'bg-slate-100/60 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Meta Diária de Questões
                  </span>
                </div>
                <span className="text-sm font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                  {targetQuestions} questões/dia
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mb-3">
                Quantidade recomendada para bancas paulistas e ENARE: 15 a 30 questões.
              </p>

              {/* Slider */}
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                disabled={goalType === 'time'}
                value={targetQuestions}
                onChange={(e) => setTargetQuestions(Number(e.target.value))}
                className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[10px] uppercase font-bold text-slate-400">Presets:</span>
                {[10, 15, 20, 30, 50].map((q) => (
                  <button
                    key={q}
                    type="button"
                    disabled={goalType === 'time'}
                    onClick={() => setTargetQuestions(q)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      targetQuestions === q
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {q} Q
                  </button>
                ))}
              </div>
            </div>

            {/* Setting: Daily Study Time */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                goalType === 'questions'
                  ? 'bg-slate-100/60 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Meta Diária de Tempo de Estudo
                  </span>
                </div>
                <span className="text-sm font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                  {formatTimeStr(targetStudyMinutes)}/dia
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mb-3">
                Tempo líquido diário com atenção sustentada e revisão ativa.
              </p>

              {/* Slider */}
              <input
                type="range"
                min="15"
                max="240"
                step="15"
                disabled={goalType === 'questions'}
                value={targetStudyMinutes}
                onChange={(e) => setTargetStudyMinutes(Number(e.target.value))}
                className="w-full accent-teal-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[10px] uppercase font-bold text-slate-400">Presets:</span>
                {[30, 45, 60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    disabled={goalType === 'questions'}
                    onClick={() => setTargetStudyMinutes(mins)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      targetStudyMinutes === mins
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {mins >= 60 ? `${mins / 60}h` : `${mins}m`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setGoalType('both');
                setTargetQuestions(15);
                setTargetStudyMinutes(60);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Restaurar Padrão (15Q / 1h)
            </button>
            <button
              type="button"
              onClick={handleSavePreferences}
              className="px-5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Preferências de Meta</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VISUAL PROGRESS FEEDBACK OVERVIEW */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* Overall Completion Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-bold border border-teal-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Progresso das Metas de Hoje</span>
            </div>
            <h3 className="text-xl font-black tracking-tight">
              {overallPercent >= 100
                ? 'Parabéns! Você bateu sua meta de estudos hoje! 🎉'
                : overallPercent >= 70
                ? 'Reta final! Você está a poucos passos da meta diária.'
                : overallPercent >= 30
                ? 'Ritmo constante. Mantenha o foco até o fim do dia.'
                : 'Novo dia de estudo iniciado. Cada questão conta!'}
            </h3>
            <p className="text-xs text-slate-300">
              Modo ativo:{' '}
              <strong className="text-teal-300">
                {goalType === 'questions'
                  ? 'Foco em Quantidade de Questões'
                  : goalType === 'time'
                  ? 'Foco em Tempo de Estudo'
                  : 'Metas Combinadas (Questões + Horas Líquidas)'}
              </strong>
            </p>
          </div>

          {/* Radial progress ring or big stat */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="w-20 h-20 rounded-full border-4 border-teal-400/80 flex flex-col items-center justify-center bg-teal-950/80 shadow-inner">
              <span className="text-xl font-black text-teal-300">{overallPercent}%</span>
              <span className="text-[9px] text-teal-200 uppercase font-bold tracking-tight">
                Concluído
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Dual Visual Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Quantidade de Questões */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              goalType === 'time'
                ? 'bg-slate-50 border-slate-200/80 opacity-80'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Volume de Questões do Dia
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Meta definida: <strong>{targetQuestions} questões</strong>
                  </p>
                </div>
              </div>

              {isQuestionsMet ? (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Atingida</span>
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                  Faltam {Math.max(0, targetQuestions - currentQuestions)}
                </span>
              )}
            </div>

            {/* Score & Visual Gauge */}
            <div className="mt-4 space-y-2">
              <div className="flex items-baseline justify-between text-xs font-semibold">
                <span className="text-slate-600">
                  Resolvidas hoje:{' '}
                  <strong className="text-slate-900 text-base font-black">
                    {currentQuestions}
                  </strong>{' '}
                  / {targetQuestions}
                </span>
                <span
                  className={`font-bold ${
                    isQuestionsMet ? 'text-emerald-600' : 'text-teal-700'
                  }`}
                >
                  {questionsPercent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isQuestionsMet
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500'
                      : 'bg-gradient-to-r from-teal-700 to-teal-500'
                  }`}
                  style={{ width: `${questionsPercent}%` }}
                />
              </div>
            </div>

            {/* Interactive quick controls */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Registrar rápida:
                </span>
                <button
                  type="button"
                  onClick={() => handleAddQuestionCount(1)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center space-x-0.5"
                  title="Registrar +1 questão resolvida"
                >
                  <Plus className="w-3 h-3" />
                  <span>1Q</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddQuestionCount(5)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center space-x-0.5"
                  title="Registrar +5 questões resolvidas"
                >
                  <Plus className="w-3 h-3" />
                  <span>5Q</span>
                </button>
              </div>

              {onNavigateToQuestions && (
                <button
                  type="button"
                  onClick={onNavigateToQuestions}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 underline cursor-pointer"
                >
                  Praticar Questões Agora &rarr;
                </button>
              )}
            </div>
          </div>

          {/* Card 2: Tempo de Estudo */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              goalType === 'questions'
                ? 'bg-slate-50 border-slate-200/80 opacity-80'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Tempo Líquido de Estudo
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Meta definida: <strong>{formatTimeStr(targetStudyMinutes)}</strong>
                  </p>
                </div>
              </div>

              {isTimeMet ? (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Atingida</span>
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                  Faltam {Math.max(0, targetStudyMinutes - currentMinutes)} min
                </span>
              )}
            </div>

            {/* Score & Visual Gauge */}
            <div className="mt-4 space-y-2">
              <div className="flex items-baseline justify-between text-xs font-semibold">
                <span className="text-slate-600">
                  Acumulado hoje:{' '}
                  <strong className="text-slate-900 text-base font-black">
                    {formatTimeStr(currentMinutes)}
                  </strong>{' '}
                  / {formatTimeStr(targetStudyMinutes)}
                </span>
                <span
                  className={`font-bold ${
                    isTimeMet ? 'text-emerald-600' : 'text-teal-700'
                  }`}
                >
                  {timePercent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTimeMet
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500'
                      : 'bg-gradient-to-r from-teal-700 to-teal-500'
                  }`}
                  style={{ width: `${timePercent}%` }}
                />
              </div>
            </div>

            {/* Interactive session timer & quick add */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                {!isTimerRunning && sessionSeconds === 0 ? (
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(true)}
                    className="px-2.5 py-1 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Cronometrar Foco</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 bg-slate-100 px-2 py-1 rounded-lg">
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {formatTimerSeconds(sessionSeconds)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                      title={isTimerRunning ? 'Pausar' : 'Continuar'}
                    >
                      {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    </button>
                    {sessionSeconds >= 60 && (
                      <button
                        type="button"
                        onClick={handleSaveTimerSession}
                        className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold cursor-pointer hover:bg-emerald-700"
                        title="Computar minutos no progresso"
                      >
                        Salvar +{Math.floor(sessionSeconds / 60)}m
                      </button>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleAddStudyMinutes(15)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center space-x-0.5"
                  title="Adicionar 15 minutos manualmente"
                >
                  <Plus className="w-3 h-3" />
                  <span>15 min</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                {currentMinutes >= 60 ? `${(currentMinutes / 60).toFixed(1)}h acumuladas` : `${currentMinutes}m`}
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Consistency Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </span>
            <div>
              <div className="text-sm font-black text-slate-900">{stats.streakDays} Dias</div>
              <div className="text-[10px] font-medium text-slate-500 uppercase">Sequência Ativa</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div>
              <div className="text-sm font-black text-slate-900">{stats.averageScorePercent}%</div>
              <div className="text-[10px] font-medium text-slate-500 uppercase">Média Geral</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <div className="text-sm font-black text-slate-900">{stats.totalQuestionsAnswered}</div>
              <div className="text-[10px] font-medium text-slate-500 uppercase">Total Resolvidas</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <div className="text-sm font-black text-slate-900">
                {stats.simulatedExamsCompleted} Provas
              </div>
              <div className="text-[10px] font-medium text-slate-500 uppercase">Simulados Feitos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
