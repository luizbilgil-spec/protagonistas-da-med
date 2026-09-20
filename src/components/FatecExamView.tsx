import React, { useState, useEffect, useRef } from 'react';
import { 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Check, 
  X, 
  Download, 
  Layers, 
  Sparkles, 
  AlertCircle, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Stethoscope, 
  Award,
  Heart,
  Activity,
  Table,
  HelpCircle,
  Zap,
  Volume2,
  Filter,
  Brain,
  Target,
  AlertTriangle
} from 'lucide-react';
import { 
  VALVOPATHY_EASY_EXAM,
  VALVOPATHY_MEDIUM_EXAM,
  VALVOPATHY_HARD_EXAM,
  VALVOPATHY_EXAM_FLASHCARDS, 
  ValvopathyExamQuestion 
} from '../data/fatecExamData';
import { Flashcard, ReviewRating } from '../types';
import { ExamErrorAnalysis } from './ExamErrorAnalysis';

interface FatecExamViewProps {
  onAddScoreToStats?: (correct: number, total: number) => void;
}

type TabMode = 'simulado' | 'analise_erros' | 'flashcards' | 'matriz_hemodinamica';
export type ExamDifficultyMode = 'facil' | 'media' | 'dificil' | 'todas';

const ALL_VALVOPATHY_QUESTIONS: ValvopathyExamQuestion[] = [
  ...VALVOPATHY_EASY_EXAM,
  ...VALVOPATHY_MEDIUM_EXAM,
  ...VALVOPATHY_HARD_EXAM
];

export const FatecExamView: React.FC<FatecExamViewProps> = ({ onAddScoreToStats }) => {
  const [activeTabMode, setActiveTabMode] = useState<TabMode>('simulado');
  const [selectedExamMode, setSelectedExamMode] = useState<ExamDifficultyMode>('facil');

  // Active question set based on Difficulty Level
  const activeQuestionsList: ValvopathyExamQuestion[] = 
    selectedExamMode === 'facil' 
      ? VALVOPATHY_EASY_EXAM 
      : selectedExamMode === 'media' 
      ? VALVOPATHY_MEDIUM_EXAM 
      : selectedExamMode === 'dificil'
      ? VALVOPATHY_HARD_EXAM
      : ALL_VALVOPATHY_QUESTIONS;

  // ====================================================
  // SIMULADO STATE
  // ====================================================
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [immediateFeedback, setImmediateFeedback] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [onlyErrorsFilter, setOnlyErrorsFilter] = useState<boolean>(false);
  const [simuladoViewMode, setSimuladoViewMode] = useState<'questions' | 'error_analysis'>('questions');
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(30 * 60); // 30 min
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeQuestion: ValvopathyExamQuestion = activeQuestionsList[currentQIndex] || activeQuestionsList[0];

  const getExamTitle = () => {
    switch (selectedExamMode) {
      case 'facil': return 'Prova Fácil (20 Questões)';
      case 'media': return 'Prova Média (20 Questões)';
      case 'dificil': return 'Prova Difícil (20 Questões)';
      case 'todas': return 'Banco Geral (60 Questões)';
      default: return 'Prova de Valvopatias';
    }
  };

  // When switching exams, reset index and state safely
  const handleSwitchExamMode = (mode: ExamDifficultyMode) => {
    setSelectedExamMode(mode);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setExamFinished(false);
    setOnlyErrorsFilter(false);
    setSimuladoViewMode('questions');
    const duration = mode === 'todas' ? 90 * 60 : 30 * 60;
    setTimeRemainingSeconds(duration);
    setTimeElapsedSeconds(0);
  };

  useEffect(() => {
    if (!examFinished) {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examFinished]);

  const handleSelectAlternative = (questionId: string, altId: string) => {
    if (examFinished && !immediateFeedback) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: altId
    }));
  };

  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamFinished(true);

    let correctCount = 0;
    activeQuestionsList.forEach(q => {
      const chosen = selectedAnswers[q.id];
      if (chosen && chosen === q.professorCorrection.correctOptionId) {
        correctCount++;
      }
    });

    if (onAddScoreToStats) {
      onAddScoreToStats(correctCount, activeQuestionsList.length);
    }
  };

  const handleRestartExam = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setExamFinished(false);
    setOnlyErrorsFilter(false);
    setSimuladoViewMode('questions');
    const duration = selectedExamMode === 'todas' ? 90 * 60 : 30 * 60;
    setTimeRemainingSeconds(duration);
    setTimeElapsedSeconds(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  // Score calculations
  const totalAnswered = activeQuestionsList.filter(q => selectedAnswers[q.id] !== undefined).length;
  let currentScore = 0;
  let totalErrors = 0;
  activeQuestionsList.forEach(q => {
    const chosen = selectedAnswers[q.id];
    if (chosen && chosen === q.professorCorrection.correctOptionId) {
      currentScore++;
    } else {
      totalErrors++;
    }
  });
  const scorePercent = Math.round((currentScore / activeQuestionsList.length) * 100);

  // ====================================================
  // FLASHCARDS STATE
  // ====================================================
  const [flashcardList, setFlashcardList] = useState<Flashcard[]>(VALVOPATHY_EXAM_FLASHCARDS);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlashcardRating = (rating: ReviewRating) => {
    setIsFlipped(false);
    if (activeCardIndex < flashcardList.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    } else {
      setActiveCardIndex(0);
    }
  };

  const exportValvopathyAnki = () => {
    let tsvContent = "#separator:tab\n#html:true\n#tags column:4\n";
    flashcardList.forEach(card => {
      const front = card.front.replace(/\n/g, '<br>');
      const back = `${card.back.replace(/\n/g, '<br>')}<br><br><b>Pérola Clínica:</b> ${card.clinicalPearl}`;
      const tags = card.ankiTags.join(' ');
      tsvContent += `${front}\t${back}\t${card.subspecialty}\t${tags}\n`;
    });

    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Anki_Valvopatias_Semiologia_Cardiaca.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner - Valvopatias & Semiologia Cardíaca */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-teal-700/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-semibold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-teal-300" />
            <span>Módulo Temático Cardiovascular</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Valvopatias, Semiologia de Bulhas & Hemodinâmica Clínica
          </h1>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-teal-200">
            <span><strong>Foco Fisiopatológico:</strong> Estenose e Insuficiência Aórtica</span>
            <span>•</span>
            <span>Estenose Mitral & Descompensação na Gestação</span>
            <span>•</span>
            <span>Semiogênese de B3 vs. B4 e FA</span>
            <span>•</span>
            <span>Cardiopatia Carcinoide & Sopro de Graham Steell</span>
          </div>

          <p className="text-teal-100/90 text-sm leading-relaxed pt-1">
            <strong>3 Provas Completas Inéditas (Fácil, Média e Difícil — 20 questões cada, totalizando 60 questões)</strong>, abordando rigorosamente a fisiopatologia das fotos: Estenose e Insuficiência Aórtica, Estenose Mitral na Gravidez, B3/B4 na Fibrilação Atrial, Cardiopatia Carcinoide, Pelagra e Sopro de Graham Steell.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTabMode('simulado')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xs shrink-0 ${
            activeTabMode === 'simulado'
              ? 'bg-teal-700 text-white shadow-teal-700/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>1. Simulados por Nível (3 Provas de 20Q)</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-teal-800 text-white font-bold">60Q Total</span>
        </button>

        <button
          onClick={() => setActiveTabMode('analise_erros')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xs shrink-0 ${
            activeTabMode === 'analise_erros'
              ? 'bg-teal-700 text-white shadow-teal-700/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Brain className="w-4 h-4 text-teal-300" />
          <span>2. Análise de Erros & Pontos Fracos</span>
          {examFinished && totalErrors > 0 ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
              {totalErrors} {totalErrors === 1 ? 'Erro' : 'Erros'}
            </span>
          ) : (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">
              IA & Radar
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTabMode('flashcards')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xs shrink-0 ${
            activeTabMode === 'flashcards'
              ? 'bg-teal-700 text-white shadow-teal-700/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. Flashcards de Fixação (SM-2 & Anki)</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-bold">10 Cards</span>
        </button>

        <button
          onClick={() => setActiveTabMode('matriz_hemodinamica')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xs shrink-0 ${
            activeTabMode === 'matriz_hemodinamica'
              ? 'bg-teal-700 text-white shadow-teal-700/20'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>4. Matriz Sinóptica das Valvopatias</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. SIMULADO DE CASOS CLÍNICOS INÉDITOS */}
      {/* ========================================================================= */}
      {activeTabMode === 'simulado' && (
        <div className="space-y-6">
          {/* Seletor de Nível de Dificuldade da Prova */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center space-x-2 text-slate-700">
              <Filter className="w-4 h-4 text-teal-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Selecione o Nível da Prova:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSwitchExamMode('facil')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  selectedExamMode === 'facil'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${selectedExamMode === 'facil' ? 'bg-white' : 'bg-emerald-500'}`} />
                <span>Prova Fácil (20Q)</span>
              </button>

              <button
                onClick={() => handleSwitchExamMode('media')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  selectedExamMode === 'media'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${selectedExamMode === 'media' ? 'bg-white' : 'bg-blue-500'}`} />
                <span>Prova Média (20Q)</span>
              </button>

              <button
                onClick={() => handleSwitchExamMode('dificil')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  selectedExamMode === 'dificil'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${selectedExamMode === 'dificil' ? 'bg-white' : 'bg-purple-500'}`} />
                <span>Prova Difícil (20Q)</span>
              </button>

              <button
                onClick={() => handleSwitchExamMode('todas')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedExamMode === 'todas'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Banco Geral (60Q)
              </button>
            </div>
          </div>

          {/* Controls bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-800">
                <Clock className="w-5 h-5 text-teal-600" />
                <span className="font-mono text-lg font-bold">
                  {formatTime(timeRemainingSeconds)}
                </span>
                <span className="text-xs text-slate-400">restantes</span>
              </div>

              <div className="h-6 w-px bg-slate-200" />

              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">{totalAnswered}</span> de{' '}
                <span className="font-bold text-slate-900">{activeQuestionsList.length}</span> respondidas
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Toggle Immediate Feedback */}
              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer select-none bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={immediateFeedback}
                  onChange={(e) => setImmediateFeedback(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <span>Modo Estudo (Comentários Imediatos)</span>
              </label>

              {!examFinished ? (
                <button
                  onClick={handleFinishExam}
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalizar Simulado</span>
                </button>
              ) : (
                <button
                  onClick={handleRestartExam}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Refazer Simulado</span>
                </button>
              )}
            </div>
          </div>

          {/* Exam Result Banner when Finished */}
          {examFinished && (
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-teal-700 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 text-xs font-bold border border-teal-500/30">
                    <Award className="w-3.5 h-3.5" />
                    <span>Desempenho no Simulado</span>
                  </div>
                  <h3 className="text-2xl font-black">
                    Você acertou {currentScore} de {activeQuestionsList.length} questões ({scorePercent}%)
                  </h3>
                  <p className="text-xs text-teal-200">
                    {scorePercent >= 80 
                      ? 'Excelente domínio fisiopatológico e semiológico das valvopatias e bulhas cardíacas!' 
                      : scorePercent >= 60 
                      ? 'Bom desempenho! Revise as justificativas anatômicas e hemodinâmicas nos comentários abaixo.' 
                      : 'Recomendamos revisar os conceitos na Matriz Sinóptica e praticar com os flashcards do módulo.'}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-24 h-24 rounded-full border-4 border-teal-400/80 flex flex-col items-center justify-center bg-teal-950/80 shadow-inner">
                    <span className="text-2xl font-black text-teal-300">{scorePercent}%</span>
                    <span className="text-[10px] text-teal-200 uppercase font-semibold">Aproveitamento</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Banner */}
              <div className="pt-3 border-t border-teal-700/60 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setSimuladoViewMode('error_analysis')}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center space-x-2 cursor-pointer ${
                    simuladoViewMode === 'error_analysis'
                      ? 'bg-white text-teal-950 ring-2 ring-white/50'
                      : 'bg-teal-400 hover:bg-teal-300 text-slate-950'
                  }`}
                >
                  <Brain className="w-4 h-4 text-slate-950" />
                  <span>Análise Inteligente de Erros & IA</span>
                  {totalErrors > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-white text-[10px] font-bold">
                      {totalErrors} {totalErrors === 1 ? 'erro' : 'erros'}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setSimuladoViewMode('questions');
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
                    simuladoViewMode === 'questions'
                      ? 'bg-teal-800 text-white border-teal-500'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-teal-300" />
                  <span>Revisar Questões (Gabarito Completo)</span>
                </button>

                {totalErrors > 0 && (
                  <button
                    onClick={() => {
                      const nextFilter = !onlyErrorsFilter;
                      setOnlyErrorsFilter(nextFilter);
                      setSimuladoViewMode('questions');
                      if (nextFilter) {
                        const firstErrorIdx = activeQuestionsList.findIndex(q => selectedAnswers[q.id] !== q.professorCorrection.correctOptionId);
                        if (firstErrorIdx !== -1) setCurrentQIndex(firstErrorIdx);
                      }
                    }}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
                      onlyErrorsFilter
                        ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                    <span>{onlyErrorsFilter ? 'Remover Filtro (Ver Todas)' : 'Filtrar Apenas Erros'}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* If error analysis view mode is selected while inside the simulado */}
          {examFinished && simuladoViewMode === 'error_analysis' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-100 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold flex items-center gap-1.5 text-teal-900">
                  <Brain className="w-4 h-4 text-teal-700" />
                  Exibindo Relatório Clínico & Radar de Fraquezas da Prova
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSimuladoViewMode('questions')}
                    className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>Voltar para Revisão Questão a Questão</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <ExamErrorAnalysis
                questions={activeQuestionsList}
                selectedAnswers={selectedAnswers}
                examTitle={getExamTitle()}
                score={currentScore}
                total={activeQuestionsList.length}
                percent={scorePercent}
                onNavigateToQuestion={(index) => {
                  setCurrentQIndex(index);
                  setSimuladoViewMode('questions');
                }}
                onFilterOnlyErrors={() => {
                  setOnlyErrorsFilter(true);
                  setSimuladoViewMode('questions');
                  const firstErrorIdx = activeQuestionsList.findIndex(q => selectedAnswers[q.id] !== q.professorCorrection.correctOptionId);
                  if (firstErrorIdx !== -1) setCurrentQIndex(firstErrorIdx);
                }}
                onRestartExam={handleRestartExam}
              />
            </div>
          ) : (
            <>
              {/* Question Navigator Numbers */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                {onlyErrorsFilter && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 text-rose-900 text-xs font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Modo Foco em Erros Ativo: Exibindo apenas as {totalErrors} questões incorretas</span>
                    </div>
                    <button
                      onClick={() => setOnlyErrorsFilter(false)}
                      className="text-xs text-rose-700 hover:text-rose-900 underline font-semibold cursor-pointer"
                    >
                      Exibir todas ({activeQuestionsList.length}Q)
                    </button>
                  </div>
                )}

                <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center justify-between">
                  <span>Navegação de Questões (Clique para ir à questão):</span>
                  {examFinished && totalErrors > 0 && (
                    <span className="text-[11px] text-rose-600 font-bold normal-case">
                      {totalErrors} {totalErrors === 1 ? 'erro identificado' : 'erros identificados'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {activeQuestionsList.map((q, idx) => {
                    const isSelected = selectedAnswers[q.id] !== undefined;
                    const isCurrent = currentQIndex === idx;
                    const isCorrect = selectedAnswers[q.id] === q.professorCorrection.correctOptionId;

                    if (onlyErrorsFilter && isCorrect) {
                      return null;
                    }

                    let btnStyle = "border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100";

                    if (isCurrent) {
                      btnStyle = "border-teal-700 bg-teal-700 text-white font-extrabold ring-2 ring-teal-500/30";
                    } else if (examFinished || immediateFeedback) {
                      if (isSelected) {
                        btnStyle = isCorrect 
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold" 
                          : "border-rose-500 bg-rose-50 text-rose-800 font-bold";
                      }
                    } else if (isSelected) {
                      btnStyle = "border-teal-600 bg-teal-50 text-teal-900 font-bold";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQIndex(idx)}
                        className={`h-11 rounded-xl border flex flex-col items-center justify-center text-xs font-semibold transition-all relative ${btnStyle}`}
                      >
                        <span>Q{idx + 1}</span>
                        {isSelected && (
                          <span className="text-[10px] font-bold opacity-80">
                            {selectedAnswers[q.id].replace('alt-', '').toUpperCase()}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Question Card */}
          {activeQuestion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Question Header */}
              <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black text-sm shadow-xs">
                    {activeQuestion.questionNumber}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">
                        {activeQuestion.subject}
                      </span>
                      {activeQuestion.difficultyLabel && (
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                          activeQuestion.difficulty === 'facil'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : activeQuestion.difficulty === 'media'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-purple-100 text-purple-800 border-purple-300'
                        }`}>
                          Nível {activeQuestion.difficultyLabel}
                        </span>
                      )}
                      {activeQuestion.caderno && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 font-semibold">
                          {activeQuestion.caderno}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {activeQuestion.topic}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 font-medium">
                    Questão {currentQIndex + 1} de {activeQuestionsList.length}
                  </span>
                </div>
              </div>

              {/* Statement */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="text-slate-900 text-base sm:text-lg leading-relaxed whitespace-pre-line font-serif">
                  {activeQuestion.statement}
                </div>

                {/* Alternatives */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Selecione a alternativa correta:
                  </div>

                  {activeQuestion.alternatives.map((alt) => {
                    const isSelected = selectedAnswers[activeQuestion.id] === alt.id;
                    const showFeedback = examFinished || (immediateFeedback && selectedAnswers[activeQuestion.id]);
                    const letter = alt.id.replace('alt-', '').toUpperCase();

                    let cardBorder = "border-slate-200 hover:border-teal-400 bg-white";
                    let letterBadge = "bg-slate-100 text-slate-700 border-slate-300";

                    if (isSelected) {
                      cardBorder = "border-teal-700 bg-teal-50/50 shadow-xs ring-1 ring-teal-600/30";
                      letterBadge = "bg-teal-700 text-white border-teal-700";
                    }

                    if (showFeedback) {
                      if (alt.isCorrect) {
                        cardBorder = "border-emerald-500 bg-emerald-50/60 shadow-xs";
                        letterBadge = "bg-emerald-600 text-white border-emerald-600";
                      } else if (isSelected && !alt.isCorrect) {
                        cardBorder = "border-rose-400 bg-rose-50/60 shadow-xs";
                        letterBadge = "bg-rose-600 text-white border-rose-600";
                      }
                    }

                    return (
                      <div key={alt.id} className="space-y-2">
                        <button
                          onClick={() => handleSelectAlternative(activeQuestion.id, alt.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 cursor-pointer ${cardBorder}`}
                        >
                          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${letterBadge}`}>
                            {letter}
                          </div>

                          <div className="flex-1 text-sm text-slate-800 leading-relaxed font-normal pt-0.5">
                            {alt.text}
                          </div>

                          {showFeedback && alt.isCorrect && (
                            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          )}
                          {showFeedback && isSelected && !alt.isCorrect && (
                            <X className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          )}
                        </button>

                        {showFeedback && (isSelected || alt.isCorrect) && (
                          <div className={`ml-10 text-xs p-3 rounded-lg border ${
                            alt.isCorrect ? 'bg-emerald-50 text-emerald-950 border-emerald-200' : 'bg-rose-50 text-rose-950 border-rose-200'
                          }`}>
                            <strong>{alt.isCorrect ? '✓ Por que é a correta:' : '✗ Por que está incorreta:'}</strong> {alt.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Comentário Fisiopatológico Detalhado */}
                {(examFinished || (immediateFeedback && selectedAnswers[activeQuestion.id])) && (
                  <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 space-y-4 border border-slate-800 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">Resolução Fisiopatológica & Comentário Clínico</div>
                          <div className="text-xs text-teal-300">{activeQuestion.professorCorrection.summaryTitle}</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-500/30">
                        Gabarito Oficial
                      </span>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {activeQuestion.professorCorrection.detailedExplanation}
                    </p>

                    <div className="bg-teal-950/70 border border-teal-700/50 rounded-xl p-3.5 space-y-1">
                      <div className="text-xs font-bold text-teal-200 flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                        <span>Pérola Clínica de Alta Retenção:</span>
                      </div>
                      <p className="text-xs text-teal-100 font-medium">
                        {activeQuestion.professorCorrection.clinicalPearl}
                      </p>
                    </div>

                    {activeQuestion.professorCorrection.anatomicalAndPharmacologicalNotes && (
                      <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 text-xs text-slate-300">
                        <strong className="text-amber-300">Implicação Farmacológica & Conduta: </strong>
                        {activeQuestion.professorCorrection.anatomicalAndPharmacologicalNotes}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs flex items-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Questão Anterior</span>
                  </button>

                  <span className="text-xs font-bold text-slate-500">
                    Questão {currentQIndex + 1} de {activeQuestionsList.length}
                  </span>

                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(activeQuestionsList.length - 1, prev + 1))}
                    disabled={currentQIndex === activeQuestionsList.length - 1}
                    className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                  >
                    <span>Próxima Questão</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ANÁLISE INTELIGENTE DE ERROS & PONTOS FRACOS (RADAR & IA) */}
      {/* ========================================================================= */}
      {activeTabMode === 'analise_erros' && (
        <div className="space-y-6">
          <ExamErrorAnalysis
            questions={activeQuestionsList}
            selectedAnswers={selectedAnswers}
            examTitle={getExamTitle()}
            score={currentScore}
            total={activeQuestionsList.length}
            percent={scorePercent}
            onNavigateToQuestion={(index) => {
              setCurrentQIndex(index);
              setActiveTabMode('simulado');
              setSimuladoViewMode('questions');
            }}
            onFilterOnlyErrors={() => {
              setOnlyErrorsFilter(true);
              setActiveTabMode('simulado');
              setSimuladoViewMode('questions');
              const firstErrorIdx = activeQuestionsList.findIndex(q => selectedAnswers[q.id] !== q.professorCorrection.correctOptionId);
              if (firstErrorIdx !== -1) setCurrentQIndex(firstErrorIdx);
            }}
            onRestartExam={() => {
              handleRestartExam();
              setActiveTabMode('simulado');
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLASHCARDS DE RETENÇÃO ESPAÇADA (SM-2 & ANKI) */}
      {/* ========================================================================= */}
      {activeTabMode === 'flashcards' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-teal-600" />
                <span>Flashcards Temáticos de Valvopatias & Semiologia Cardiovascular</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Baralho de alto rendimento cobrindo B3/B4 e FA, Tríade SAD da Estenose Aórtica, Cardiopatia Carcinoide, Sopro de Graham Steell e Estenose Mitral na gravidez.
              </p>
            </div>

            <button
              onClick={exportValvopathyAnki}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>Exportar para Anki (.txt)</span>
            </button>
          </div>

          {/* Flashcard Component */}
          {flashcardList[activeCardIndex] && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-white rounded-2xl border-2 border-slate-200 p-8 min-h-[320px] shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between select-none relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    {flashcardList[activeCardIndex].subject} • {flashcardList[activeCardIndex].subspecialty}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Card {activeCardIndex + 1} de {flashcardList.length}
                  </span>
                </div>

                <div className="py-6 my-auto text-center">
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Desafio Clínico</div>
                      <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
                        {flashcardList[activeCardIndex].front}
                      </p>
                      <div className="text-xs text-teal-600 font-medium pt-2">
                        Toque no card para virar e ver a resposta
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 text-left">
                      <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resposta & Fisiopatologia</div>
                      <p className="text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed">
                        {flashcardList[activeCardIndex].back}
                      </p>

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                        <strong>Pérola Clínica:</strong> {flashcardList[activeCardIndex].clinicalPearl}
                      </div>

                      {flashcardList[activeCardIndex].mnemonic && (
                        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-xs text-teal-900">
                          <strong>Mnemônico:</strong> {flashcardList[activeCardIndex].mnemonic}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-center text-[11px] text-slate-400">
                  {isFlipped ? 'Classifique seu domínio abaixo para atualizar a repetição espaçada SM-2' : 'Toque no card para revelar'}
                </div>
              </div>

              {/* SM-2 Controls */}
              {isFlipped && (
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleFlashcardRating('again')}
                    className="p-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs transition-colors text-center"
                  >
                    <div>Errei</div>
                    <div className="text-[10px] text-rose-700 font-normal">Rever agora</div>
                  </button>
                  <button
                    onClick={() => handleFlashcardRating('hard')}
                    className="p-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors text-center"
                  >
                    <div>Difícil</div>
                    <div className="text-[10px] text-amber-700 font-normal">Rever em 1 dia</div>
                  </button>
                  <button
                    onClick={() => handleFlashcardRating('good')}
                    className="p-3 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-xs transition-colors text-center"
                  >
                    <div>Bom</div>
                    <div className="text-[10px] text-teal-700 font-normal">Rever em 3 dias</div>
                  </button>
                  <button
                    onClick={() => handleFlashcardRating('easy')}
                    className="p-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition-colors text-center"
                  >
                    <div>Fácil</div>
                    <div className="text-[10px] text-emerald-700 font-normal">Rever em 6 dias</div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MATRIZ SINÓPTICA DAS VALVOPATIAS & HEMODINÂMICA */}
      {/* ========================================================================= */}
      {activeTabMode === 'matriz_hemodinamica' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Table className="w-5 h-5 text-teal-600" />
              <span>Matriz Comparativa das 4 Grandes Valvopatias Esquerdas</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Diferenciação precisa entre sobrecarga de pressão vs. volume, características auscultatórias, repercussões cavitárias e pulsos arteriais periféricos.
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-4">Valvopatia</th>
                  <th className="p-4">Tipo de Sobrecarga</th>
                  <th className="p-4">Morfologia do Sopro</th>
                  <th className="p-4">Bulhas & Ruídos</th>
                  <th className="p-4">Pulso Arterial & PA</th>
                  <th className="p-4">Repercussão Estrutural</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Estenose Aórtica */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="text-sm text-teal-800">Estenose Aórtica (EAo)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Calcificação senil / Bicúspide</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold">
                      Sobrecarga de PRESSÃO
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">Pós-carga excessiva crônica</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>Mesossistólico ejetivo em diamante</strong> (crescendo-decrescendo) no 2º EICD com irradiação para carótidas. Pico tardio na forma grave.
                  </td>
                  <td className="p-4 text-slate-700">
                    B4 presente (contração atrial contra VE rígido). B2 hipofonética (A2 apagado) ou desdobramento paradoxal.
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>Pulso Parvus et Tardus</strong> (baixa amplitude e ascensão lenta). Pressão convergente (ex: 100x80 mmHg).
                  </td>
                  <td className="p-4 text-slate-700">
                    Hipertrofia CONCÊNTRICA do VE. Área cardíaca no RX inicial pode ser rigorosamente normal.
                  </td>
                </tr>

                {/* Insuficiência Aórtica */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="text-sm text-teal-800">Insuficiência Aórtica (IAo)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Dilatação anular / Endocardite</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      Sobrecarga de VOLUME
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">Refluxo diastólico aórtico maciço</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>Diastólico aspirativo precoce</strong> de alta frequência na borda esternal esquerda. Pode ter sopro de hiperfluxo sistólico associado.
                  </td>
                  <td className="p-4 text-slate-700">
                    Pode cursar com B3 protodiastólica. Ruflar de Austin Flint funcional no ápice (jato de refluxo empurrando cúspide mitral).
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>Pulso em Martelo d'água / Corrigan</strong> (colapsante). Pressão DIVERGENTE (ex: 160x40 mmHg).
                  </td>
                  <td className="p-4 text-slate-700">
                    Dilatação EXCÊNTRICA maciça do VE (maior coração da medicina: <em>Cor Bovis</em>).
                  </td>
                </tr>

                {/* Estenose Mitral */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="text-sm text-teal-800">Estenose Mitral (EM)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Sequela reumática crônica</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                      Sobrecarga de PRESSÃO no Átrio E.
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">VE preservado/protegido</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>Ruflar diastólico</strong> de baixa tonalidade no ápice (melhor com campânula em Decúbito Lateral Esquerdo / Posição de Pachon). Reforço pré-sistólico presente em ritmo sinusal.
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>B1 hiperfonética</strong>. Estalido de abertura mitral protodiastólico (opening snap). P2 hiperfonética se houver HAP.
                  </td>
                  <td className="p-4 text-slate-700">
                    Pulso periférico normal ou pequeno (baixo débito crônico). Arritmia completa se em Fibrilação Atrial.
                  </td>
                  <td className="p-4 text-slate-700">
                    Dilatação acentuada do Átrio Esquerdo com alta incidência de FA e tromboembolismo. Congestão venocapilar e hipertensão pulmonar.
                  </td>
                </tr>

                {/* Insuficiência Mitral */}
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">
                    <div className="text-sm text-teal-800">Insuficiência Mitral (IM)</div>
                    <div className="text-[10px] text-slate-500 font-normal">Prolapso / Isquêmica / Reumática</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      Sobrecarga de VOLUME
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">Regurgitação sistólica VE → AE</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>Holossistólico em platô</strong> regurgitativo no ápice com irradiação típica para a axila esquerda e dorso.
                  </td>
                  <td className="p-4 text-slate-700">
                    <strong>B1 hipofonética</strong> (falha de coaptação das cúspides). Terceira bulha (B3) surge pela sobrecarga de volume na protodiástole.
                  </td>
                  <td className="p-4 text-slate-700">
                    Pulso carotídeo célere (ascensão rápida, pois parte do volume esvazia para o AE antes da abertura aórtica).
                  </td>
                  <td className="p-4 text-slate-700">
                    Dilatação acentuada biventricular/atrial (VE e AE dilatados).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3 Special High-Yield Focus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: B3 vs B4 e Fibrilação Atrial */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-teal-800 font-bold text-sm">
                <Volume2 className="w-5 h-5 text-teal-600" />
                <span>Bulhas Cardíacas na FA</span>
              </div>
              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-rose-700">Quarta Bulha (B4):</strong> Som da sístole atrial impulsionando o fluxo contra ventrículo rígido (telediástole). Na Fibrilação Atrial, <strong>NÃO EXISTE B4</strong> pela ausência de contração atrial coordenada!
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-blue-700">Terceira Bulha (B3):</strong> Ruído protodiastólico de desaceleração súbita no enchimento rápido. Traduz sobrecarga de volume e disfunção sistólica.
                </div>
              </div>
            </div>

            {/* Card 2: Cardiopatia Carcinoide & Pelagra */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-teal-800 font-bold text-sm">
                <Zap className="w-5 h-5 text-teal-600" />
                <span>Cardiopatia Carcinoide</span>
              </div>
              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Acometimento Valvar Direito:</strong> Metástases hepáticas lançam serotonina na veia cava, lesando <strong>Tricúspide e Pulmonar</strong> (causando IT e IP).
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Coração Esquerdo Poupado:</strong> O leito vascular pulmonar possui abundante Monoamina Oxidase (MAO), que degrada e inativa a serotonina!
                </div>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                  <strong>Pelagra Secundária:</strong> O desvio maciço de triptofano para formar serotonina deprime a síntese de Vitamina B3 (Niacina), gerando os 3Ds: Dermatite, Diarreia e Demência.
                </div>
              </div>
            </div>

            {/* Card 3: Sopro de Graham Steell & Estenose na Gestação */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-teal-800 font-bold text-sm">
                <Heart className="w-5 h-5 text-teal-600" />
                <span>Graham Steell & Gestação</span>
              </div>
              <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Sopro de Graham Steell:</strong> Sopro diastólico aspirativo no 2º EIC esquerdo decorrente de regurgitação pulmonar funcional gerada por <em>Hipertensão Arterial Pulmonar grave</em> em estenose mitral.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Estenose Mitral no 3º Trimestre:</strong> Aumento de 50% na volemia + taquicardia gestacional encurtam a diástole e disparam a pressão no átrio esquerdo, provocando edema pulmonar e hemoptise (apoplexia pulmonar).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
