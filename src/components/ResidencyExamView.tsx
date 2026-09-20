import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Flag, 
  Award, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  BarChart, 
  FileCheck,
  Check,
  X,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { ResidencyQuestion, MedicalSubject } from '../types';

interface ResidencyExamViewProps {
  questions: ResidencyQuestion[];
  onExamComplete: (score: number, total: number) => void;
}

export const ResidencyExamView: React.FC<ResidencyExamViewProps> = ({
  questions,
  onExamComplete,
}) => {
  const [examState, setExamState] = useState<'config' | 'in_progress' | 'completed'>('config');
  const [examDurationMinutes, setExamDurationMinutes] = useState<number>(30);
  const [examSubject, setExamSubject] = useState<'Todos' | MedicalSubject>('Todos');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Active exam state
  const [examQuestions, setExamQuestions] = useState<ResidencyQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter available questions based on config
  const startExam = () => {
    let pool = [...questions];
    if (examSubject !== 'Todos') {
      pool = pool.filter(q => q.subject === examSubject);
    }
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    if (selected.length === 0) {
      alert('Não há questões disponíveis para o filtro selecionado.');
      return;
    }

    setExamQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(examDurationMinutes * 60);
    setTimeElapsedSeconds(0);
    setExamState('in_progress');
  };

  // Timer effect
  useEffect(() => {
    if (examState === 'in_progress') {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState]);

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamState('completed');

    // Calculate score
    let correct = 0;
    examQuestions.forEach(q => {
      const chosenAltId = selectedAnswers[q.id];
      const correctAlt = q.alternatives.find(a => a.isCorrect);
      if (chosenAltId && correctAlt && chosenAltId === correctAlt.id) {
        correct++;
      }
    });

    onExamComplete(correct, examQuestions.length);
  };

  const currentQ = examQuestions[currentQuestionIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Calculations for results
  const scoreStats = React.useMemo(() => {
    if (examState !== 'completed') return null;

    let correct = 0;
    let anatomyCorrect = 0;
    let anatomyTotal = 0;
    let pharmaCorrect = 0;
    let pharmaTotal = 0;

    examQuestions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const correctAlt = q.alternatives.find(a => a.isCorrect);
      const isRight = chosen === correctAlt?.id;

      if (isRight) correct++;

      if (q.subject === 'Anatomia') {
        anatomyTotal++;
        if (isRight) anatomyCorrect++;
      } else if (q.subject === 'Farmacologia') {
        pharmaTotal++;
        if (isRight) pharmaCorrect++;
      }
    });

    const percent = Math.round((correct / examQuestions.length) * 100) || 0;
    const avgSecondsPerQ = Math.round(timeElapsedSeconds / (examQuestions.length || 1));

    // Simulated percentile calculation
    let percentile = 65;
    if (percent >= 90) percentile = 98;
    else if (percent >= 80) percentile = 88;
    else if (percent >= 70) percentile = 76;
    else if (percent >= 60) percentile = 58;
    else percentile = 35;

    return {
      correct,
      total: examQuestions.length,
      percent,
      percentile,
      avgSecondsPerQ,
      anatomyCorrect,
      anatomyTotal,
      pharmaCorrect,
      pharmaTotal,
    };
  }, [examState, examQuestions, selectedAnswers, timeElapsedSeconds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. CONFIGURATION VIEW */}
      {examState === 'config' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
              <Clock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Simulador de Prova de Residência Médica
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Ambiente com tempo cronometrado rigoroso para treinar velocidade de raciocínio clínico e gestão de estresse nas provas reais (USP, ENARE, UNIFESP).
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Exam duration selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Duração do Teste
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { mins: 15, label: '15 min (Express)' },
                  { mins: 30, label: '30 min (Padrão)' },
                  { mins: 60, label: '60 min (Completo)' },
                  { mins: 120, label: '120 min (Simulado Real)' }
                ].map((item) => (
                  <button
                    key={item.mins}
                    onClick={() => setExamDurationMinutes(item.mins)}
                    className={`py-3 px-2 rounded-2xl text-xs font-semibold border text-center transition-all ${
                      examDurationMinutes === item.mins
                        ? 'bg-rose-50 border-rose-500 text-rose-800 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Foco Temático
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Todos', 'Anatomia', 'Farmacologia'] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setExamSubject(sub)}
                    className={`py-2.5 px-2 rounded-2xl text-xs font-semibold border text-center transition-all ${
                      examSubject === sub
                        ? 'bg-teal-50 border-teal-500 text-teal-800 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {sub === 'Todos' ? 'Misto (Anat + Farma)' : sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of questions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Quantidade de Questões
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[5, 10, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                      questionCount === num
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {num} Questões
                  </button>
                ))}
              </div>
            </div>

            {/* Residency Exam Rules Notice */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Regras da Plataforma de Testes:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                <li>O cronômetro não pausa após o início da prova.</li>
                <li>Você pode navegar livremente e sinalizar questões para revisão posterior.</li>
                <li>Os comentários dos professores só serão liberados após a finalização do gabarito.</li>
              </ul>
            </div>

            <button
              id="start-exam-button"
              onClick={startExam}
              className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-rose-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Iniciar Simulado Cronometrado</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. IN-PROGRESS EXAM VIEW */}
      {examState === 'in_progress' && currentQ && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Main Question Panel (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Header with Board, Year and Flag */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-bold text-xs">
                  {currentQ.examBoard} {currentQ.year}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-semibold text-xs border border-teal-200">
                  {currentQ.subject}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentQ.subspecialty}
                </span>
              </div>

              <button
                id="flag-question-button"
                onClick={() => {
                  setFlaggedQuestions(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  flaggedQuestions[currentQ.id]
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{flaggedQuestions[currentQ.id] ? 'Sinalizada p/ Revisão' : 'Dúvida? Sinalizar'}</span>
              </button>
            </div>

            {/* Question Statement */}
            <div className="space-y-3">
              <p className="text-slate-900 text-sm sm:text-base leading-relaxed font-normal">
                {currentQ.statement}
              </p>
              {currentQ.clinicalContext && (
                <p className="text-slate-900 font-semibold text-sm sm:text-base leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  {currentQ.clinicalContext}
                </p>
              )}
            </div>

            {/* Alternatives */}
            <div className="space-y-3 pt-2">
              {currentQ.alternatives.map((alt, index) => {
                const letters = ['A', 'B', 'C', 'D', 'E'];
                const isSelected = selectedAnswers[currentQ.id] === alt.id;

                return (
                  <button
                    key={alt.id}
                    onClick={() => {
                      setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: alt.id }));
                    }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start space-x-3.5 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {letters[index]}
                    </span>
                    <span className={`text-xs sm:text-sm leading-relaxed ${
                      isSelected ? 'font-semibold text-teal-950' : 'text-slate-700'
                    }`}>
                      {alt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav inside question */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <span className="text-xs text-slate-400 font-medium">
                Questão {currentQuestionIndex + 1} de {examQuestions.length}
              </span>

              <button
                disabled={currentQuestionIndex === examQuestions.length - 1}
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Countdown & Navigation Matrix (1 col) */}
          <div className="space-y-4">
            {/* Timer card */}
            <div className={`rounded-3xl border p-5 text-center shadow-xs ${
              timeLeftSeconds < 180 
                ? 'bg-rose-50 border-rose-300 text-rose-900 animate-pulse' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                <Clock className="w-4 h-4 text-rose-500" />
                <span>Tempo Restante</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900">
                {formatTime(timeLeftSeconds)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Decorrido: {formatTime(timeElapsedSeconds)}
              </div>
            </div>

            {/* Question Matrix Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Grade de Questões
                </h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {Object.keys(selectedAnswers).length}/{examQuestions.length}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {examQuestions.map((q, idx) => {
                  const isAnswered = Boolean(selectedAnswers[q.id]);
                  const isFlagged = Boolean(flaggedQuestions[q.id]);
                  const isCurrent = currentQuestionIndex === idx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-xl text-xs font-bold relative transition-all ${
                        isCurrent
                          ? 'ring-2 ring-teal-600 ring-offset-2'
                          : ''
                      } ${
                        isAnswered
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-md bg-teal-700" />
                  <span>Respondida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300" />
                  <span>Em branco</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Sinalizada (Dúvida)</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="finish-exam-button"
                onClick={() => {
                  const unanswered = examQuestions.length - Object.keys(selectedAnswers).length;
                  if (unanswered > 0) {
                    if (!confirm(`Você ainda possui ${unanswered} questão(ões) em branco. Deseja realmente finalizar o gabarito agora?`)) {
                      return;
                    }
                  }
                  finishExam();
                }}
                className="w-full py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-xs transition-colors"
              >
                Finalizar e Ver Gabarito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. EXAM REPORT & PROFESSOR EXPLANATIONS VIEW */}
      {examState === 'completed' && scoreStats && (
        <div className="space-y-6">
          {/* Performance Hero Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
                  <Award className="w-3.5 h-3.5" />
                  <span>Relatório Oficial de Desempenho</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Simulado Finalizado com Sucesso!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Veja a análise detalhada das bancas e o gabarito comentado pelos melhores professores.
                </p>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full md:w-auto">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-teal-700">
                    {scoreStats.percent}%
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {scoreStats.correct}/{scoreStats.total} Acertos
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-indigo-700">
                    {scoreStats.percentile}º
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    Percentil Simulado
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-slate-800">
                    {Math.round(scoreStats.avgSecondsPerQ)}s
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    Média / Questão
                  </div>
                </div>
              </div>

              {/* Restart button */}
              <button
                onClick={() => setExamState('config')}
                className="px-5 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs transition-colors flex items-center space-x-2 shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Novo Simulado</span>
              </button>
            </div>

            {/* Subject balance bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Anatomia</span>
                  <span>{scoreStats.anatomyCorrect}/{scoreStats.anatomyTotal} ({scoreStats.anatomyTotal ? Math.round((scoreStats.anatomyCorrect / scoreStats.anatomyTotal) * 100) : 0}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all"
                    style={{ width: `${scoreStats.anatomyTotal ? (scoreStats.anatomyCorrect / scoreStats.anatomyTotal) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Farmacologia</span>
                  <span>{scoreStats.pharmaCorrect}/{scoreStats.pharmaTotal} ({scoreStats.pharmaTotal ? Math.round((scoreStats.pharmaCorrect / scoreStats.pharmaTotal) * 100) : 0}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-600 rounded-full transition-all"
                    style={{ width: `${scoreStats.pharmaTotal ? (scoreStats.pharmaCorrect / scoreStats.pharmaTotal) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Question by Question Commentary Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Gabarito Comentado Questão a Questão</span>
            </h3>

            {examQuestions.map((q, qIndex) => {
              const userChoiceId = selectedAnswers[q.id];
              const correctAlt = q.alternatives.find(a => a.isCorrect);
              const isCorrect = userChoiceId === correctAlt?.id;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-3xl border-2 p-6 shadow-xs space-y-4 ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {qIndex + 1}
                      </span>
                      <span className="font-bold text-xs text-slate-900">
                        {q.examBoard} {q.year}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        • {q.subject} ({q.subspecialty})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center space-x-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <Check className="w-3.5 h-3.5" />
                          <span>Você acertou</span>
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center space-x-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                          <X className="w-3.5 h-3.5" />
                          <span>Você errou</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Statement */}
                  <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                    {q.statement}
                  </p>

                  {/* Alternatives Review */}
                  <div className="space-y-2">
                    {q.alternatives.map((alt) => {
                      const isUserChoice = userChoiceId === alt.id;
                      const isRightAlt = alt.isCorrect;

                      return (
                        <div
                          key={alt.id}
                          className={`p-3 rounded-xl text-xs border transition-colors ${
                            isRightAlt
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                              : isUserChoice
                              ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                              : 'bg-slate-50/60 border-slate-200 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-2">
                              {isRightAlt ? (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : isUserChoice ? (
                                <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              ) : (
                                <div className="w-4 h-4 shrink-0" />
                              )}
                              <span>{alt.text}</span>
                            </div>
                            {isUserChoice && (
                              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 shrink-0 ml-2">
                                (Sua resposta)
                              </span>
                            )}
                          </div>
                          {alt.explanation && (
                            <p className="mt-1 pl-6 text-[11px] text-slate-500 italic">
                              {alt.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Professor Commentary Box */}
                  <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs space-y-2">
                    <div className="flex items-center justify-between text-teal-900 font-bold">
                      <div className="flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-teal-700" />
                        <span>Comentário do Professor: {q.professorComment.author}</span>
                      </div>
                      <span className="text-[10px] text-teal-700 font-normal">{q.professorComment.specialty}</span>
                    </div>

                    <p className="text-slate-800 leading-relaxed">
                      {q.professorComment.commentary}
                    </p>

                    <div className="pt-2 border-t border-teal-200/60 flex flex-wrap items-center gap-3">
                      <div className="flex items-center space-x-1 text-teal-800 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>Pérola: {q.professorComment.pearl}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
