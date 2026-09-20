import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  CheckCircle2, 
  Clock, 
  Flag, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  X, 
  Download, 
  Layers, 
  Table, 
  Zap, 
  BookOpen, 
  Stethoscope, 
  AlertTriangle,
  Award,
  Filter,
  Flame,
  Gauge,
  Split,
  ShieldAlert,
  HeartHandshake,
  Activity,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { 
  CARDIO_TOPICS, 
  CARDIO_20_QUESTIONS, 
  CARDIO_COMPARISON_MATRICES, 
  CARDIO_TOPIC_FLASHCARDS,
  CARDIO_QUICK_QUIZ,
  CardioExamQuestion
} from '../data/cardioStudyData';
import { CardioTopicId, Flashcard, ReviewRating } from '../types';

interface CardioStudyHubViewProps {
  onAddScoreToStats?: (correct: number, total: number) => void;
}

type StudyMode = 'prova' | 'flashcards' | 'comparativo' | 'guia' | 'quiz';

export const CardioStudyHubView: React.FC<CardioStudyHubViewProps> = ({ onAddScoreToStats }) => {
  const [currentMode, setCurrentMode] = useState<StudyMode>('prova');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<'todos' | CardioTopicId>('todos');

  // ====================================================
  // STATE FOR PROVA 20 QUESTÕES (MARCAR X)
  // ====================================================
  const [examStarted, setExamStarted] = useState<boolean>(true);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [immediateFeedbackMode, setImmediateFeedbackMode] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(40 * 60); // 40 minutes for 20 questions
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered questions if user filters by topic during study
  const displayedQuestions = selectedTopicFilter === 'todos' 
    ? CARDIO_20_QUESTIONS 
    : CARDIO_20_QUESTIONS.filter(q => q.cardioTopic === selectedTopicFilter);

  const activeQuestion = displayedQuestions[currentQIndex] || displayedQuestions[0];

  // Timer logic for Prova
  useEffect(() => {
    if (examStarted && !examFinished) {
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
  }, [examStarted, examFinished]);

  const handleSelectAlternative = (questionId: string, altId: string) => {
    if (examFinished && !immediateFeedbackMode) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: altId
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamFinished(true);

    // Calculate score
    let correctCount = 0;
    CARDIO_20_QUESTIONS.forEach(q => {
      const selected = selectedAnswers[q.id];
      const correct = q.alternatives.find(a => a.isCorrect);
      if (selected && correct && selected === correct.id) {
        correctCount++;
      }
    });

    if (onAddScoreToStats) {
      onAddScoreToStats(correctCount, CARDIO_20_QUESTIONS.length);
    }
  };

  const handleRestartExam = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setCurrentQIndex(0);
    setExamFinished(false);
    setExamStarted(true);
    setTimeRemainingSeconds(40 * 60);
    setTimeElapsedSeconds(0);
  };

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  // Performance calculations
  const totalAnsweredCount = Object.keys(selectedAnswers).length;
  let scoreTotal = 0;
  CARDIO_20_QUESTIONS.forEach(q => {
    const chosen = selectedAnswers[q.id];
    const correct = q.alternatives.find(a => a.isCorrect);
    if (chosen && correct && chosen === correct.id) {
      scoreTotal++;
    }
  });
  const scorePercent = Math.round((scoreTotal / CARDIO_20_QUESTIONS.length) * 100);

  // Score per topic
  const topicScoreBreakdown = CARDIO_TOPICS.map(topic => {
    const topicQuestions = CARDIO_20_QUESTIONS.filter(q => q.cardioTopic === topic.id);
    let correctInTopic = 0;
    topicQuestions.forEach(q => {
      const chosen = selectedAnswers[q.id];
      const correct = q.alternatives.find(a => a.isCorrect);
      if (chosen && correct && chosen === correct.id) {
        correctInTopic++;
      }
    });
    return {
      topic,
      total: topicQuestions.length,
      correct: correctInTopic,
      percent: Math.round((correctInTopic / topicQuestions.length) * 100)
    };
  });

  // ====================================================
  // STATE FOR FLASHCARDS
  // ====================================================
  const [flashcardList, setFlashcardList] = useState<Flashcard[]>(CARDIO_TOPIC_FLASHCARDS);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlashcardRating = (rating: ReviewRating) => {
    // Advance card
    setIsFlipped(false);
    if (activeCardIndex < flashcardList.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    } else {
      setActiveCardIndex(0);
    }
  };

  const exportCardioAnkiDeck = () => {
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
    link.download = `Anki_ProtagonistasDaMed_Cardio_6Temas.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ====================================================
  // STATE FOR QUICK QUIZ (V ou F)
  // ====================================================
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});
  const handleQuizAnswer = (quizId: string, answer: boolean) => {
    setQuizAnswers(prev => ({
      ...prev,
      [quizId]: answer
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-red-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-rose-700/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 text-xs font-semibold uppercase tracking-wider">
            <HeartPulse className="w-4 h-4 text-rose-300 animate-pulse" />
            <span>Módulo Intensivo Cardiovascular</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Trilha Cardiovascular de Alto Rendimento
          </h1>

          <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
            Preparação direcionada com <strong>vários métodos de estudo</strong> e <strong>Prova Oficial de 20 Questões de Marcar X</strong> focadas exatamente nos 6 temas cardinais de residência médica:
          </p>

          {/* 6 Topics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {CARDIO_TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicFilter(selectedTopicFilter === topic.id ? 'todos' : topic.id);
                  setCurrentQIndex(0);
                }}
                className={`flex items-center space-x-2 p-2 rounded-xl text-left transition-all border ${
                  selectedTopicFilter === topic.id
                    ? 'bg-white text-rose-950 border-white shadow-md'
                    : 'bg-rose-950/60 text-rose-100 border-rose-700/50 hover:bg-rose-900/80'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 flex-shrink-0">
                  {topic.id === 'dac' && <Activity className="w-3.5 h-3.5" />}
                  {topic.id === 'disseccao' && <Split className="w-3.5 h-3.5" />}
                  {topic.id === 'miocardite' && <Flame className="w-3.5 h-3.5" />}
                  {topic.id === 'aneurisma' && <ShieldAlert className="w-3.5 h-3.5" />}
                  {topic.id === 'hipertensao' && <Gauge className="w-3.5 h-3.5" />}
                  {topic.id === 'valvopatias' && <HeartHandshake className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate leading-tight">{topic.title.split(' ')[0]} {topic.title.split(' ')[1] || ''}</div>
                  <div className="text-[10px] text-rose-300 opacity-80">{topic.questionCount} questões</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Pills: Vários Jeitos de Estudar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 overflow-x-auto gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentMode('prova')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              currentMode === 'prova'
                ? 'bg-rose-600 text-white shadow-rose-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Prova 20 Questões (Marcar X)</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-rose-700 text-white font-bold">20Q</span>
          </button>

          <button
            onClick={() => setCurrentMode('flashcards')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              currentMode === 'flashcards'
                ? 'bg-rose-600 text-white shadow-rose-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Flashcards SM-2 & Anki</span>
          </button>

          <button
            onClick={() => setCurrentMode('comparativo')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              currentMode === 'comparativo'
                ? 'bg-rose-600 text-white shadow-rose-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>3. Matrizes Comparativas</span>
          </button>

          <button
            onClick={() => setCurrentMode('guia')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              currentMode === 'guia'
                ? 'bg-rose-600 text-white shadow-rose-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>4. Guia de Prescrição & Conduta</span>
          </button>

          <button
            onClick={() => setCurrentMode('quiz')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              currentMode === 'quiz'
                ? 'bg-rose-600 text-white shadow-rose-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>5. Quiz Rápido (V / F)</span>
          </button>
        </div>

        {selectedTopicFilter !== 'todos' && (
          <button
            onClick={() => setSelectedTopicFilter('todos')}
            className="text-xs text-rose-600 font-semibold flex items-center space-x-1 hover:underline whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpar filtro ({selectedTopicFilter})</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODO 1: PROVA DE 20 QUESTÕES (MARCAR X) */}
      {/* ========================================================================= */}
      {currentMode === 'prova' && (
        <div className="space-y-6">
          {/* Prova Control Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-700">
                <Clock className="w-5 h-5 text-rose-600" />
                <span className="font-mono text-lg font-bold">
                  {formatTime(timeRemainingSeconds)}
                </span>
                <span className="text-xs text-slate-400">restantes</span>
              </div>

              <div className="h-6 w-px bg-slate-200" />

              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">{totalAnsweredCount}</span> de{' '}
                <span className="font-bold text-slate-900">{CARDIO_20_QUESTIONS.length}</span> respondidas
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={immediateFeedbackMode}
                  onChange={(e) => setImmediateFeedbackMode(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>Modo Estudo (Feedback imediato ao marcar X)</span>
              </label>

              {!examFinished ? (
                <button
                  onClick={handleFinishExam}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalizar Prova & Ver Gabarito</span>
                </button>
              ) : (
                <button
                  onClick={handleRestartExam}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Refazer Prova</span>
                </button>
              )}
            </div>
          </div>

          {/* Exam Result Banner when Finished */}
          {examFinished && (
            <div className="bg-gradient-to-br from-slate-900 to-rose-950 rounded-2xl p-6 text-white border border-rose-800/40 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-900/60 pb-4">
                <div>
                  <div className="text-xs text-rose-300 font-semibold uppercase tracking-wider">
                    Resultado da Prova Oficial • 20 Questões Cardiovasculares
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Sua Pontuação: <span className="text-rose-400">{scoreTotal}</span> / 20 ({scorePercent}%)
                  </h3>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Tempo Gasto</div>
                    <div className="font-mono font-bold text-lg text-rose-200">
                      {formatTime(timeElapsedSeconds)}
                    </div>
                  </div>
                  <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-400/30">
                    <Award className="w-8 h-8 text-rose-300" />
                  </div>
                </div>
              </div>

              {/* Breakdown by Topic */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-rose-200">Desempenho por Conteúdo Temático:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {topicScoreBreakdown.map(tb => (
                    <div key={tb.topic.id} className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                      <div className="text-xs font-bold truncate text-slate-200">{tb.topic.title.split(' ')[0]} {tb.topic.title.split(' ')[1] || ''}</div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-sm font-extrabold text-white">{tb.correct}/{tb.total}</span>
                        <span className={`text-xs font-bold ${tb.percent >= 75 ? 'text-emerald-400' : tb.percent >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {tb.percent}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className={`h-full ${tb.percent >= 75 ? 'bg-emerald-400' : tb.percent >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
                          style={{ width: `${tb.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-rose-200/80 pt-2">
                *Role abaixo para analisar o <strong>gabarito oficial comentado item a item</strong> pelos professores com pérolas e raciocínio farmacológico.
              </div>
            </div>
          )}

          {/* Matrix of Questions 1 to 20 */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <span>Cartão-Resposta da Prova (Clique para navegar na questão):</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-rose-600 inline-block" />
                  <span>Atual</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-slate-900 inline-block" />
                  <span>Marcada</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                  <span>Dúvida (Flag)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded border border-slate-300 inline-block" />
                  <span>Pendente</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5">
              {CARDIO_20_QUESTIONS.map((q, idx) => {
                const isSelected = currentQIndex === idx;
                const isAnswered = !!selectedAnswers[q.id];
                const isFlagged = !!flaggedQuestions[q.id];
                const chosenAlt = selectedAnswers[q.id];
                const correctAlt = q.alternatives.find(a => a.isCorrect);
                const isCorrect = chosenAlt && correctAlt && chosenAlt === correctAlt.id;

                let badgeColor = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
                if (examFinished || immediateFeedbackMode) {
                  if (isAnswered) {
                    badgeColor = isCorrect ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600';
                  } else {
                    badgeColor = 'bg-slate-100 text-slate-400 border-slate-200';
                  }
                } else {
                  if (isSelected) {
                    badgeColor = 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-300 font-bold';
                  } else if (isFlagged) {
                    badgeColor = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                  } else if (isAnswered) {
                    badgeColor = 'bg-slate-900 text-white border-slate-900 font-medium';
                  }
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-lg text-xs flex flex-col items-center justify-center border transition-all relative ${badgeColor}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && !examFinished && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-1 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Card */}
          {activeQuestion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              {/* Question Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {currentQIndex + 1}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">{activeQuestion.examBoard} {activeQuestion.year}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {activeQuestion.cardioTopicName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">Questão Oficial de Marcar X</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleFlag(activeQuestion.id)}
                    className={`p-2 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors border ${
                      flaggedQuestions[activeQuestion.id]
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[activeQuestion.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{flaggedQuestions[activeQuestion.id] ? 'Dúvida Marcada' : 'Marcar Dúvida'}</span>
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Statement */}
                <div className="space-y-3">
                  <p className="text-base sm:text-lg text-slate-900 leading-relaxed font-normal">
                    {activeQuestion.statement}
                  </p>
                  {activeQuestion.clinicalContext && (
                    <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {activeQuestion.clinicalContext}
                    </p>
                  )}
                </div>

                {/* Alternatives List (Marcar X) */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Selecione a alternativa correta (Marque o X):
                  </div>

                  {activeQuestion.alternatives.map((alt, altIdx) => {
                    const letter = String.fromCharCode(65 + altIdx); // A, B, C, D, E
                    const isSelected = selectedAnswers[activeQuestion.id] === alt.id;
                    const showFeedback = examFinished || immediateFeedbackMode;

                    let buttonStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
                    let letterStyle = 'bg-slate-100 text-slate-700 border-slate-300';

                    if (showFeedback) {
                      if (alt.isCorrect) {
                        buttonStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium shadow-xs';
                        letterStyle = 'bg-emerald-600 text-white border-emerald-600';
                      } else if (isSelected && !alt.isCorrect) {
                        buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 shadow-xs';
                        letterStyle = 'bg-rose-600 text-white border-rose-600';
                      } else {
                        buttonStyle = 'border-slate-200 bg-slate-50/50 text-slate-500 opacity-70';
                      }
                    } else if (isSelected) {
                      buttonStyle = 'border-rose-600 bg-rose-50/60 text-slate-900 ring-2 ring-rose-500/20 shadow-xs font-medium';
                      letterStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                    }

                    return (
                      <div key={alt.id} className="space-y-2">
                        <button
                          onClick={() => handleSelectAlternative(activeQuestion.id, alt.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${buttonStyle}`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border flex-shrink-0 mt-0.5 ${letterStyle}`}>
                            {isSelected ? 'X' : letter}
                          </div>
                          <div className="flex-1 text-sm sm:text-base leading-relaxed">
                            {alt.text}
                          </div>
                          {showFeedback && alt.isCorrect && (
                            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          )}
                          {showFeedback && isSelected && !alt.isCorrect && (
                            <X className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                          )}
                        </button>

                        {/* Individual explanation if feedback mode active */}
                        {showFeedback && (isSelected || alt.isCorrect) && (
                          <div className={`ml-10 text-xs p-3 rounded-lg border ${
                            alt.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-rose-50 text-rose-900 border-rose-200'
                          }`}>
                            <strong>{alt.isCorrect ? '✓ Justificativa do Gabarito:' : '✗ Por que está incorreta:'}</strong> {alt.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Professor Commentary Card (Shown in Feedback mode or when finished) */}
                {(examFinished || (immediateFeedbackMode && selectedAnswers[activeQuestion.id])) && (
                  <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 space-y-4 border border-slate-800 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-xs">
                          {activeQuestion.professorComment.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{activeQuestion.professorComment.author}</div>
                          <div className="text-xs text-rose-300">{activeQuestion.professorComment.specialty}</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/30">
                        Comentário da Banca
                      </span>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed">
                      {activeQuestion.professorComment.commentary}
                    </p>

                    <div className="bg-rose-950/70 border border-rose-700/50 rounded-xl p-3.5 space-y-1">
                      <div className="text-xs font-bold text-rose-200 flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-rose-400" />
                        <span>Pérola de Prova (High-Yield Pearl):</span>
                      </div>
                      <p className="text-xs text-rose-100 font-medium">
                        {activeQuestion.professorComment.pearl}
                      </p>
                    </div>

                    {activeQuestion.professorComment.anatomicalCorrelation && (
                      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-slate-300">
                        <strong className="text-teal-300">Correlação Anatômico-Cirúrgica: </strong>
                        {activeQuestion.professorComment.anatomicalCorrelation}
                      </div>
                    )}

                    {activeQuestion.professorComment.pharmacologicalInsight && (
                      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-slate-300">
                        <strong className="text-amber-300">Raciocínio Farmacológico: </strong>
                        {activeQuestion.professorComment.pharmacologicalInsight}
                      </div>
                    )}
                  </div>
                )}

                {/* Question Navigation Controls */}
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
                    {currentQIndex + 1} de {displayedQuestions.length}
                  </span>

                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(displayedQuestions.length - 1, prev + 1))}
                    disabled={currentQIndex === displayedQuestions.length - 1}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                  >
                    <span>Próxima Questão</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 2: FLASHCARDS SM-2 & EXPORTAR ANKI */}
      {/* ========================================================================= */}
      {currentMode === 'flashcards' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-rose-600" />
                <span>Flashcards Ativos dos 6 Temas (Algoritmo SM-2)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cartas de memorização espaçada otimizadas para retenção de longo prazo e exportação direta.
              </p>
            </div>

            <button
              onClick={exportCardioAnkiDeck}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>Exportar Baralho para Anki (.txt)</span>
            </button>
          </div>

          {/* Active Card Viewer */}
          {flashcardList[activeCardIndex] && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-white rounded-2xl border-2 border-slate-200 p-8 min-h-[320px] shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between select-none relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                    {flashcardList[activeCardIndex].subspecialty}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Card {activeCardIndex + 1} de {flashcardList.length}
                  </span>
                </div>

                <div className="py-6 my-auto text-center">
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pergunta</div>
                      <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
                        {flashcardList[activeCardIndex].front}
                      </p>
                      <div className="text-xs text-rose-600 font-medium pt-2">
                        Clique para virar o card e ver a resposta
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 text-left">
                      <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resposta & Raciocínio</div>
                      <p className="text-sm sm:text-base text-slate-800 whitespace-pre-line leading-relaxed">
                        {flashcardList[activeCardIndex].back}
                      </p>

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                        <strong>Pérola de Prova:</strong> {flashcardList[activeCardIndex].clinicalPearl}
                      </div>

                      {flashcardList[activeCardIndex].mnemonic && (
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-purple-900">
                          <strong>Mnemônico:</strong> {flashcardList[activeCardIndex].mnemonic}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-center text-[11px] text-slate-400">
                  {isFlipped ? 'Classifique seu domínio abaixo para ajustar o SM-2' : 'Toque no card para revelar'}
                </div>
              </div>

              {/* SM-2 Rating Controls */}
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
      {/* MODO 3: MATRIZES COMPARATIVAS & DIFERENCIAIS */}
      {/* ========================================================================= */}
      {currentMode === 'comparativo' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Table className="w-5 h-5 text-rose-600" />
              <span>Matrizes de Diagnóstico Diferencial de Alto Rendimento</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tabelas comparativas para não errar as pegadinhas clássicas das bancas de residência.
            </p>
          </div>

          <div className="space-y-6">
            {CARDIO_COMPARISON_MATRICES.map((mat, mIdx) => (
              <div key={mIdx} className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">{mat.category}</span>
                    <h3 className="text-base sm:text-lg font-bold text-white">{mat.title}</h3>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-slate-200">
                    Tabela #{mIdx + 1}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        {mat.columns.map((col, cIdx) => (
                          <th key={cIdx} className="p-3.5 border-r border-slate-200 last:border-r-0 whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800">
                      {mat.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                          <td className="p-3.5 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/80">
                            {row.feature}
                          </td>
                          <td className="p-3.5 border-r border-slate-200 leading-relaxed">
                            {row.col1}
                          </td>
                          <td className="p-3.5 border-r border-slate-200 leading-relaxed">
                            {row.col2}
                          </td>
                          {row.col3 && (
                            <td className="p-3.5 border-r border-slate-200 leading-relaxed">
                              {row.col3}
                            </td>
                          )}
                          {row.col4 && (
                            <td className="p-3.5 leading-relaxed">
                              {row.col4}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-rose-50 border-t border-rose-200 p-4 flex items-center space-x-2 text-xs text-rose-950 font-medium">
                  <Sparkles className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span><strong>Pérola de Fixação:</strong> {mat.pearl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 4: GUIA RÁPIDO DE PRESCRIÇÕES & CONDUTAS */}
      {/* ========================================================================= */}
      {currentMode === 'guia' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-rose-600" />
              <span>Prescrições de Emergência & Protocolos dos 6 Temas</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Posologias hospitalares, diluições e critérios cirúrgicos para consulta rápida no plantão e na prova prática.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DAC Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>1. Protocolo Farmacológico do IAM com Supra (SCA CSST)</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>• <strong>AAS:</strong> 200 a 300 mg mastigado (dose de ataque). Manutenção: 100 mg/dia.</li>
                <li>• <strong>Ticagrelor:</strong> 180 mg VO de ataque, depois 90 mg de 12/12h (preferível ao Clopidogrel 600 mg).</li>
                <li>• <strong>Heparina:</strong> HNF 60 UI/kg em bólus IV (máx 4000 UI) + infusão contínua 12 UI/kg/h ou Enoxaparina 1 mg/kg SC 12/12h.</li>
                <li>• <strong>Atorvastatina:</strong> 80 mg VO de ataque nas primeiras 24h.</li>
                <li>• <strong>Atenção:</strong> Nitrato e Morfina CONTRAINDICADOS em infarto de Ventrículo Direito (V3R/V4R) ou hipotensão.</li>
              </ul>
            </div>

            {/* Dissecção Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                <Split className="w-4 h-4" />
                <span>2. Controle Hemodinâmico Agudo na Dissecção de Aorta</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>• <strong>1º Passo (Betabloqueador):</strong> Esmolol IV (ataque 500 mcg/kg em 1 min, seguido de 50-200 mcg/kg/min) ou Labetalol 20 mg IV a cada 10 min. <strong>Meta: FC &lt; 60 bpm</strong>.</li>
                <li>• <strong>2º Passo (Vasodilatador):</strong> Nitroprussiato de Sódio 0,25 a 0,5 mcg/kg/min em BIC. <strong>Meta: PAS entre 100 e 120 mmHg</strong>.</li>
                <li>• <strong>Regra Inviolável:</strong> NUNCA iniciar o Nitroprussiato antes do betabloqueador (risco de taquicardia reflexa e rotura aórtica).</li>
              </ul>
            </div>

            {/* Miocardite Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                <Flame className="w-4 h-4" />
                <span>3. Manejo da Miocardite / Miopericardite</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>• <strong>Forma Leve / Miopericardite:</strong> Repouso físico absoluto por 3-6 meses + Ibuprofeno 600 mg 8/8h + Colchicina 0,5 mg 12/12h por 3 meses.</li>
                <li>• <strong>Com Disfunção Ventricular:</strong> Otimização clássica de ICFEr (IECA/BRA + Betabloqueador + Espironolactona + iSGLT2).</li>
                <li>• <strong>Forma Fulminante com Choque:</strong> Suporte mecânico precoce (ECMO venoarterial) + Biópsia Endomiocárdica imediata.</li>
              </ul>
            </div>

            {/* Aneurisma Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>4. Critérios e Vigilância do Aneurisma de Aorta (AAA)</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>• <strong>Diâmetro &lt; 4,0 cm:</strong> USG de controle a cada 2 a 3 anos.</li>
                <li>• <strong>Diâmetro 4,0 a 5,4 cm:</strong> USG ou Angio-TC a cada 6 a 12 meses.</li>
                <li>• <strong>Indicação de Intervenção (EVAR ou Aberta):</strong> Diâmetro ≥ 5,5 cm em homens (≥ 5,0 cm em mulheres), expansão &gt; 0,5 cm em 6 meses, ou presença de qualquer sintoma.</li>
              </ul>
            </div>

            {/* Hipertensão Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                <Gauge className="w-4 h-4" />
                <span>5. Anti-hipertensivos de 1ª Linha & Combinações</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>• <strong>IECA / BRA:</strong> Enalapril 10-40 mg/dia ou Losartana 50-100 mg/dia.</li>
                <li>• <strong>Bloqueador de Canal de Cálcio:</strong> Anlodipino 5-10 mg/dia.</li>
                <li>• <strong>Diurético Tiazídico:</strong> Clortalidona 12,5-25 mg/dia ou Indapamida 1,5 mg/dia.</li>
                <li>• <strong>HAS Resistente (4º fármaco):</strong> Espironolactona 25-50 mg/dia.</li>
              </ul>
            </div>

            {/* Valvopatias Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                <HeartHandshake className="w-4 h-4" />
                <span>6. Indicações de Intervenção Valvar (SBC / AHA)</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>• <strong>Estenose Aórtica:</strong> Presença de sintomas (tríade SAD) ou FE &lt; 50% ou Área &lt; 1,0 cm² com gradiente médio &gt; 40 mmHg -&gt; TAVI ou Cirurgia.</li>
                <li>• <strong>Insuficiência Aórtica:</strong> Sintomáticos ou FE ≤ 50% ou Diâmetro Sistólico Final do VE &gt; 50 mm.</li>
                <li>• <strong>Estenose Mitral:</strong> Sintomáticos com área ≤ 1,5 cm² -&gt; Valvoplastia percutânea por balão (se escore de Wilkins ≤ 8).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 5: QUIZ RÁPIDO DE FIXAÇÃO (V / F) */}
      {/* ========================================================================= */}
      {currentMode === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-rose-600" />
              <span>Quiz Relâmpago de Fixação Imediata (Verdadeiro ou Falso)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Afirmações diretas e conceituais para testar se os principais pontos já estão sedimentados na memória.
            </p>
          </div>

          <div className="space-y-3">
            {CARDIO_QUICK_QUIZ.map((q, idx) => {
              const answered = quizAnswers[q.id] !== undefined;
              const isUserCorrect = answered && quizAnswers[q.id] === q.isTrue;

              return (
                <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium text-slate-900 leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {!answered ? (
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => handleQuizAnswer(q.id, true)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs hover:bg-emerald-100 transition-colors"
                        >
                          Verdadeiro
                        </button>
                        <button
                          onClick={() => handleQuizAnswer(q.id, false)}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-300 font-bold text-xs hover:bg-rose-100 transition-colors"
                        >
                          Falso
                        </button>
                      </div>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1 flex-shrink-0 ${
                        isUserCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isUserCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        <span>{isUserCorrect ? 'Acertou!' : 'Errou!'}</span>
                      </span>
                    )}
                  </div>

                  {answered && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                      q.isTrue ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
                    }`}>
                      <strong>Gabarito: {q.isTrue ? 'VERDADEIRO' : 'FALSO'}.</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
