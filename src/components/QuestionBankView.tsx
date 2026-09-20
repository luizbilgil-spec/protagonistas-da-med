import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Check, 
  X, 
  Sparkles, 
  Award, 
  Bookmark, 
  BookmarkCheck, 
  HelpCircle,
  Lightbulb,
  Building2,
  Tag
} from 'lucide-react';
import { ResidencyQuestion, MedicalSubject, Subspecialty } from '../types';

interface QuestionBankViewProps {
  questions: ResidencyQuestion[];
  onAnswerQuestion: (questionId: string, isCorrect: boolean) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  onAnswerQuestion,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'Todos' | MedicalSubject>('Todos');
  const [selectedBoard, setSelectedBoard] = useState<string>('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // User interaction state per question
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchSubject = selectedSubject === 'Todos' || q.subject === selectedSubject;
      const matchBoard = selectedBoard === 'Todas' || q.examBoard === selectedBoard;
      const matchDiff = selectedDifficulty === 'Todas' || q.difficulty === selectedDifficulty;
      const matchSearch = searchQuery.trim() === '' ||
        q.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.subspecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.professorComment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.professorComment.pearl.toLowerCase().includes(searchQuery.toLowerCase());

      return matchSubject && matchBoard && matchDiff && matchSearch;
    });
  }, [questions, selectedSubject, selectedBoard, selectedDifficulty, searchQuery]);

  const examBoards = useMemo(() => {
    const list = new Set(questions.map(q => q.examBoard));
    return ['Todas', ...Array.from(list)];
  }, [questions]);

  const handleSelectAlternative = (question: ResidencyQuestion, altId: string) => {
    if (userAnswers[question.id]) return; // already answered

    const correctAlt = question.alternatives.find(a => a.isCorrect);
    const isCorrect = altId === correctAlt?.id;

    setUserAnswers(prev => ({ ...prev, [question.id]: altId }));
    setShowComments(prev => ({ ...prev, [question.id]: true }));
    onAnswerQuestion(question.id, isCorrect);
  };

  const toggleBookmark = (qId: string) => {
    setBookmarkedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Banco de Questões Comentadas pelos Melhores Professores
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Questões das maiores bancas de Residência Médica do país (USP, UNIFESP, ENARE, SUS-SP) com fundamentação alternativa por alternativa.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
          {filteredQuestions.length} de {questions.length} questões disponíveis
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Subject Pills */}
          <div className="inline-flex rounded-xl bg-slate-200/70 p-1">
            {(['Todos', 'Anatomia', 'Farmacologia'] as const).map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSubject === subj
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          {/* Board selector */}
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          >
            {examBoards.map((b) => (
              <option key={b} value={b}>Banca: {b}</option>
            ))}
          </select>

          {/* Difficulty selector */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          >
            <option value="Todas">Todas Dificuldades</option>
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar tema ou professor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIndex) => {
          const userAnswerId = userAnswers[q.id];
          const hasAnswered = Boolean(userAnswerId);
          const correctAlt = q.alternatives.find(a => a.isCorrect);
          const isCorrect = userAnswerId === correctAlt?.id;
          const isCommentOpen = showComments[q.id];
          const isBookmarked = bookmarkedQuestions[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5 transition-shadow hover:shadow-sm"
            >
              {/* Question Meta Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-900 text-white font-bold text-xs">
                    {q.examBoard} {q.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-800 font-semibold text-xs border border-teal-200">
                    {q.subject}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {q.subspecialty}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    q.difficulty === 'Fácil' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : q.difficulty === 'Médio'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                    title={isBookmarked ? "Remover dos salvos" : "Salvar questão para revisão"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-teal-600 fill-teal-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Statement */}
              <div className="space-y-3">
                <p className="text-slate-900 text-sm sm:text-base leading-relaxed">
                  {q.statement}
                </p>
                {q.clinicalContext && (
                  <p className="text-slate-900 font-semibold text-sm leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    {q.clinicalContext}
                  </p>
                )}
              </div>

              {/* Alternatives Selection */}
              <div className="space-y-2.5">
                {q.alternatives.map((alt, index) => {
                  const letters = ['A', 'B', 'C', 'D', 'E'];
                  const isSelected = userAnswerId === alt.id;
                  const isThisCorrect = alt.isCorrect;

                  let borderStyle = 'border-slate-200 hover:border-slate-300 bg-white';
                  let badgeStyle = 'bg-slate-100 text-slate-700';

                  if (hasAnswered) {
                    if (isThisCorrect) {
                      borderStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium';
                      badgeStyle = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isThisCorrect) {
                      borderStyle = 'border-rose-400 bg-rose-50/60 text-rose-950';
                      badgeStyle = 'bg-rose-600 text-white';
                    } else {
                      borderStyle = 'border-slate-100 bg-slate-50/40 text-slate-500 opacity-70';
                    }
                  } else if (isSelected) {
                    borderStyle = 'border-teal-600 bg-teal-50/50';
                    badgeStyle = 'bg-teal-700 text-white';
                  }

                  return (
                    <button
                      key={alt.id}
                      disabled={hasAnswered}
                      onClick={() => handleSelectAlternative(q, alt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start space-x-3 ${borderStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}>
                        {letters[index]}
                      </span>
                      <div className="space-y-1 w-full">
                        <p className="text-xs sm:text-sm leading-relaxed">{alt.text}</p>
                        {hasAnswered && isCommentOpen && alt.explanation && (
                          <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/40">
                            {alt.explanation}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Toggle Professor Commentary Button & Box */}
              <div className="pt-2">
                {!isCommentOpen ? (
                  <button
                    onClick={() => setShowComments(prev => ({ ...prev, [q.id]: true }))}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 p-2 rounded-xl hover:bg-teal-50 transition-colors"
                  >
                    <Award className="w-4 h-4 text-teal-600" />
                    <span>Ver Comentário Completo do Professor</span>
                  </button>
                ) : (
                  <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200/90 text-xs space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-teal-200/60">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                          {q.professorComment.author[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-teal-950">{q.professorComment.author}</h4>
                          <p className="text-[10px] text-teal-700">{q.professorComment.specialty}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-teal-800 border border-teal-200">
                        Comentário Gabaritado
                      </span>
                    </div>

                    <p className="text-slate-800 leading-relaxed text-xs sm:text-sm">
                      {q.professorComment.commentary}
                    </p>

                    {/* Pearls and insights */}
                    <div className="space-y-2 pt-1">
                      <div className="p-2.5 rounded-xl bg-white border border-teal-200/60 text-teal-900 font-medium text-xs flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-teal-950">Pérola de Ouro da Residência:</strong> {q.professorComment.pearl}
                        </div>
                      </div>

                      {q.professorComment.pharmacologicalInsight && (
                        <div className="p-2.5 rounded-xl bg-white border border-cyan-200/60 text-cyan-900 text-xs flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-cyan-950">Raciocínio Farmacológico:</strong> {q.professorComment.pharmacologicalInsight}
                          </div>
                        </div>
                      )}

                      {q.professorComment.anatomicalCorrelation && (
                        <div className="p-2.5 rounded-xl bg-white border border-indigo-200/60 text-indigo-900 text-xs flex items-start space-x-2">
                          <Building2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-indigo-950">Correlação Anatômica:</strong> {q.professorComment.anatomicalCorrelation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
