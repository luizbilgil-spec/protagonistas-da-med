import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Brain, 
  Target, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Flame, 
  Check, 
  Copy,
  Activity,
  Stethoscope
} from 'lucide-react';
import { ValvopathyExamQuestion } from '../data/fatecExamData';

export interface TopicWeakness {
  topic: string;
  subject: string;
  total: number;
  incorrect: number;
  correct: number;
  errorRate: number;
  questionIndexes: number[];
  missedQuestions: {
    question: ValvopathyExamQuestion;
    questionIndex: number;
    studentChoiceId?: string;
    studentChoiceText?: string;
    correctChoiceId: string;
    correctChoiceText: string;
    pearl: string;
  }[];
}

export interface AIErrorAnalysisResponse {
  executiveSummary: string;
  pedagogicDiagnosis: string;
  criticalWeaknesses?: {
    topic: string;
    errorRate: number;
    missedCount: number;
    guidance: string;
  }[];
  studyPrescription: string[];
  residencyPearl: string;
}

interface ExamErrorAnalysisProps {
  questions: ValvopathyExamQuestion[];
  selectedAnswers: Record<string, string>;
  examTitle: string;
  score: number;
  total: number;
  percent: number;
  onNavigateToQuestion: (index: number) => void;
  onFilterOnlyErrors?: () => void;
  onRestartExam: () => void;
}

export const ExamErrorAnalysis: React.FC<ExamErrorAnalysisProps> = ({
  questions,
  selectedAnswers,
  examTitle,
  score,
  total,
  percent,
  onNavigateToQuestion,
  onFilterOnlyErrors,
  onRestartExam
}) => {
  const [activeAccordionTopic, setActiveAccordionTopic] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIErrorAnalysisResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // 1. Process and rank topic weaknesses
  const topicMap: Record<string, TopicWeakness> = {};

  questions.forEach((q, idx) => {
    const topicKey = q.topic || q.subject || 'Fisiopatologia Geral';
    const chosen = selectedAnswers[q.id];
    const isCorrect = chosen === q.professorCorrection.correctOptionId;

    if (!topicMap[topicKey]) {
      topicMap[topicKey] = {
        topic: topicKey,
        subject: q.subject,
        total: 0,
        incorrect: 0,
        correct: 0,
        errorRate: 0,
        questionIndexes: [],
        missedQuestions: []
      };
    }

    topicMap[topicKey].total++;
    topicMap[topicKey].questionIndexes.push(idx);

    if (isCorrect) {
      topicMap[topicKey].correct++;
    } else {
      topicMap[topicKey].incorrect++;
      const studentAlt = q.alternatives.find(a => a.id === chosen);
      const correctAlt = q.alternatives.find(a => a.id === q.professorCorrection.correctOptionId);

      topicMap[topicKey].missedQuestions.push({
        question: q,
        questionIndex: idx,
        studentChoiceId: chosen,
        studentChoiceText: studentAlt?.text || 'Não respondida',
        correctChoiceId: q.professorCorrection.correctOptionId,
        correctChoiceText: correctAlt?.text || '',
        pearl: q.professorCorrection.clinicalPearl
      });
    }
  });

  // Calculate error rates and sort descending (highest error rate first)
  const rankedWeaknesses: TopicWeakness[] = Object.values(topicMap).map(item => {
    return {
      ...item,
      errorRate: Math.round((item.incorrect / item.total) * 100)
    };
  }).sort((a, b) => {
    if (b.errorRate !== a.errorRate) {
      return b.errorRate - a.errorRate;
    }
    return b.incorrect - a.incorrect;
  });

  // Critical topics (topics with at least 1 error)
  const failedTopics = rankedWeaknesses.filter(t => t.incorrect > 0);
  const totalMissedCount = total - score;

  // Set first weak topic open by default
  useEffect(() => {
    if (failedTopics.length > 0 && !activeAccordionTopic) {
      setActiveAccordionTopic(failedTopics[0].topic);
    }
  }, [failedTopics]);

  // Request intelligent AI analysis
  const fetchIntelligentAnalysis = async () => {
    if (totalMissedCount === 0) return;
    setIsLoadingAI(true);
    try {
      const topWeaknessesPayload = failedTopics.slice(0, 5).map(w => ({
        topic: w.topic,
        errorRate: w.errorRate,
        total: w.total,
        incorrect: w.incorrect
      }));

      const missedQuestionsPayload = failedTopics.flatMap(w => w.missedQuestions).slice(0, 4).map(m => ({
        statement: m.question.statement,
        topic: m.question.topic,
        studentAnswerText: m.studentChoiceText,
        correctAnswerText: m.correctChoiceText,
        pearl: m.pearl
      }));

      const response = await fetch('/api/ai/exam-error-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examTitle,
          score,
          total,
          percent,
          weakTopics: topWeaknessesPayload,
          missedQuestions: missedQuestionsPayload
        })
      });

      if (!response.ok) throw new Error('Falha ao obter análise');
      const data = await response.json();
      setAiAnalysis(data);
    } catch (err) {
      console.warn('Fallback para diagnóstico estruturado offline:', err);
      // High-yield structured offline fallback
      const primaryWeakness = failedTopics[0]?.topic || 'Valvopatias e Semiologia';
      setAiAnalysis({
        executiveSummary: `Auditoria de Erros Finalizada: Com ${score}/${total} (${percent}%), identificamos vulnerabilidade concentrada principalmente em "${primaryWeakness}" (${failedTopics[0]?.errorRate}% de erro).`,
        pedagogicDiagnosis: `Ao analisar os seus erros em ${failedTopics.slice(0, 3).map(w => w.topic).join(', ')}, observa-se uma tendência de confundir a cronologia dos sopros e a mecânica das sobrecargas de pressão versus volume. Na estenose aórtica e na cardiopatia carcinoide, atente para o envolvimento seletivo de receptores 5-HT2B e a ausência de lesão em câmaras esquerdas pela MAO-A pulmonar.`,
        criticalWeaknesses: failedTopics.slice(0, 3).map(w => ({
          topic: w.topic,
          errorRate: w.errorRate,
          missedCount: w.incorrect,
          guidance: `Revisar os critérios anatomo-fisiológicos e as armadilhas de prova específicas deste tema.`
        })),
        studyPrescription: [
          `Dominar as Pérolas Clínicas dos temas com mais de 50% de erro nas próximas 24h.`,
          `Refazer as questões incorretas utilizando o modo de estudo focado.`,
          `Revisar a Matriz Sinóptica de Valvopatias para comparar visualmente os regimes de alta e baixa pressão.`
        ],
        residencyPearl: `Nas provas de Residência (USP, ENARE, UNICAMP), a distinção entre IAo aguda e crônica é clássica: na aguda, NÃO espere pulso em martelo d'água de Corrigan nem pressão divergente!`
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Trigger analysis automatically on mount if there are errors
  useEffect(() => {
    if (totalMissedCount > 0 && !aiAnalysis) {
      fetchIntelligentAnalysis();
    }
  }, [totalMissedCount]);

  const handleCopySummary = () => {
    if (!aiAnalysis) return;
    const textToCopy = `[ANÁLISE DE ERROS - ${examTitle.toUpperCase()}]
Aproveitamento: ${score}/${total} (${percent}%)
${aiAnalysis.executiveSummary}

DIAGNÓSTICO PEDAGÓGICO:
${aiAnalysis.pedagogicDiagnosis}

PONTOS FRACOS PRIORITÁRIOS:
${failedTopics.map(w => `• ${w.topic}: ${w.incorrect} erro(s) em ${w.total} questão(ões) (${w.errorRate}% de erro)`).join('\n')}

PRESCRIÇÃO DE ESTUDO:
${aiAnalysis.studyPrescription.map((p, i) => `${i + 1}. ${p}`).join('\n')}

PÉROLA DA RESIDÊNCIA:
${aiAnalysis.residencyPearl}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-7 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-radial from-teal-500/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              <Brain className="w-3.5 h-3.5" />
              <span>Inteligência Pedagógica Médica</span>
              <span>•</span>
              <span>Auditoria de Desempenho</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Análise Inteligente de Erros</span>
              <span className="text-xs px-2.5 py-0.5 rounded-lg bg-teal-400/20 text-teal-200 font-semibold border border-teal-400/30">
                {examTitle}
              </span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Mapeamento algorítmico das suas vulnerabilidades conceituais, identificando os temas com maior taxa de erro e prescrevendo o reforço fisiopatológico ideal para fixação.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 self-stretch md:self-auto justify-end">
            <button
              onClick={handleCopySummary}
              disabled={!aiAnalysis}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center space-x-1.5 border border-white/15 disabled:opacity-50 cursor-pointer"
              title="Copiar resumo para suas anotações"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
            </button>

            <button
              onClick={fetchIntelligentAnalysis}
              disabled={isLoadingAI || totalMissedCount === 0}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin' : ''}`} />
              <span>{isLoadingAI ? 'Analisando...' : 'Atualizar IA'}</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-teal-300 uppercase font-bold tracking-wider block">Acertos Totais</span>
            <span className="text-xl font-black text-white">{score} <span className="text-xs text-slate-400 font-normal">/ {total}</span></span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-teal-300 uppercase font-bold tracking-wider block">Taxa de Acerto</span>
            <span className={`text-xl font-black ${percent >= 70 ? 'text-emerald-400' : percent >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
              {percent}%
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-teal-300 uppercase font-bold tracking-wider block">Erros a Sanar</span>
            <span className="text-xl font-black text-rose-300">{totalMissedCount} <span className="text-xs text-slate-400 font-normal">questões</span></span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-teal-300 uppercase font-bold tracking-wider block">Temas Vulneráveis</span>
            <span className="text-xl font-black text-amber-300">{failedTopics.length} <span className="text-xs text-slate-400 font-normal">tópicos</span></span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Scenario 1: 100% Score (Zero Errors) */}
        {totalMissedCount === 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-7 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-emerald-950">Desempenho Impecável: 100% de Aproveitamento!</h3>
            <p className="text-sm text-emerald-800 max-w-xl mx-auto leading-relaxed">
              Você acertou todas as {total} questões da {examTitle}. Não foram detectadas lacunas de raciocínio clínico ou fisiopatológico neste nível.
            </p>
            <div className="pt-2">
              <button
                onClick={onRestartExam}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all inline-flex items-center space-x-2"
              >
                <span>Tentar o Nível Seguinte</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Scenario 2: Student has errors to analyze */}
        {totalMissedCount > 0 && (
          <>
            {/* Section 1: Preceptor's Pedagogic Diagnosis (AI Summary) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-xs">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Diagnóstico Clínico do Preceptor
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Análise contextualizada de onde o raciocínio clínico vacilou nas questões erradas
                    </p>
                  </div>
                </div>

                {isLoadingAI && (
                  <span className="text-xs text-teal-700 font-semibold flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    Gerando diagnóstico com IA...
                  </span>
                )}
              </div>

              {aiAnalysis ? (
                <div className="space-y-4">
                  <div className="text-slate-800 text-sm sm:text-base leading-relaxed font-serif bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    {aiAnalysis.pedagogicDiagnosis}
                  </div>

                  {aiAnalysis.residencyPearl && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
                      <Flame className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                          Pérola de Ouro de Residência Médica:
                        </span>
                        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed pt-0.5">
                          {aiAnalysis.residencyPearl}
                        </p>
                      </div>
                    </div>
                  )}

                  {aiAnalysis.studyPrescription && aiAnalysis.studyPrescription.length > 0 && (
                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 space-y-2">
                      <span className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-teal-700" />
                        Prescrição de Estudo Recomendada:
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-teal-950">
                        {aiAnalysis.studyPrescription.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-5 h-5 rounded-full bg-teal-200 text-teal-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center space-y-2 text-slate-500">
                  <Activity className="w-8 h-8 mx-auto text-teal-600 animate-spin" />
                  <p className="text-xs">Processando dados da prova para auditoria pedagógica...</p>
                </div>
              )}
            </div>

            {/* Section 2: Ranking of Weak Points (Highest Error Rate First) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Radar de Pontos Fracos por Tema</span>
                    <span className="text-xs font-normal text-slate-500">
                      (Classificados pelo maior índice de erro)
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Clique em um tema para abrir as questões erradas, a justificativa e a Pérola do Professor.
                  </p>
                </div>

                {onFilterOnlyErrors && (
                  <button
                    onClick={onFilterOnlyErrors}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Navegar Apenas Questões Erradas ({totalMissedCount}Q)</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {rankedWeaknesses.map((weakness) => {
                  const isOpen = activeAccordionTopic === weakness.topic;
                  const isHighRisk = weakness.errorRate >= 66;
                  const isModerateRisk = weakness.errorRate >= 33 && weakness.errorRate < 66;
                  const isLowRisk = weakness.errorRate < 33;

                  let badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
                  let barColor = "bg-emerald-500";
                  let riskLabel = "Bom Domínio";

                  if (isHighRisk) {
                    badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
                    barColor = "bg-rose-500";
                    riskLabel = "Crítico (Alta Prioridade)";
                  } else if (isModerateRisk) {
                    badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
                    barColor = "bg-amber-500";
                    riskLabel = "Atenção Intermediária";
                  }

                  return (
                    <div
                      key={weakness.topic}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isHighRisk 
                          ? 'border-rose-200 bg-white shadow-xs' 
                          : isModerateRisk 
                          ? 'border-amber-200 bg-white shadow-2xs' 
                          : 'border-slate-200 bg-white/70'
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => setActiveAccordionTopic(isOpen ? null : weakness.topic)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-slate-800 truncate">
                              {weakness.topic}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${badgeColor}`}>
                              {riskLabel}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              • {weakness.subject}
                            </span>
                          </div>

                          {/* Progress Bar of Errors */}
                          <div className="flex items-center space-x-3 max-w-md">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                              <div
                                className={`h-full ${barColor} rounded-full transition-all duration-500`}
                                style={{ width: `${weakness.errorRate}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-700 min-w-16">
                              {weakness.errorRate}% erro
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 flex-shrink-0">
                          <div className="text-right hidden sm:block">
                            <span className="text-xs font-black text-slate-900 block">
                              {weakness.incorrect} erro(s) em {weakness.total}Q
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {weakness.correct} acerto(s)
                            </span>
                          </div>

                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </button>

                      {/* Accordion Content: Details of Missed Questions */}
                      {isOpen && (
                        <div className="border-t border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-4">
                          {weakness.missedQuestions.length === 0 ? (
                            <div className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Você acertou todas as questões relacionadas a este tópico!</span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Questões erradas neste tema ({weakness.missedQuestions.length}):
                              </div>

                              {weakness.missedQuestions.map((missed) => (
                                <div
                                  key={missed.question.id}
                                  className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center space-x-2">
                                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                                        Q{missed.question.questionNumber}
                                      </span>
                                      <span className="text-xs font-bold text-slate-700">
                                        Questão {missed.questionIndex + 1} da Prova
                                      </span>
                                    </div>

                                    <button
                                      onClick={() => onNavigateToQuestion(missed.questionIndex)}
                                      className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold transition-colors flex items-center space-x-1 cursor-pointer border border-teal-200"
                                    >
                                      <span>Revisar no Simulado</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </button>
                                  </div>

                                  <p className="text-xs text-slate-800 leading-relaxed font-serif line-clamp-2">
                                    {missed.question.statement}
                                  </p>

                                  {/* Answer Comparison */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg flex items-start space-x-2">
                                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <span className="font-bold text-rose-900 block">Sua Escolha:</span>
                                        <span className="text-rose-800 line-clamp-2">{missed.studentChoiceText}</span>
                                      </div>
                                    </div>

                                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg flex items-start space-x-2">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <span className="font-bold text-emerald-900 block">Gabarito Correto:</span>
                                        <span className="text-emerald-800 line-clamp-2">{missed.correctChoiceText}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Pearl Box */}
                                  <div className="bg-teal-50/70 border border-teal-200/80 p-3 rounded-lg flex items-start space-x-2">
                                    <Flame className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                                    <div className="text-xs">
                                      <span className="font-bold text-teal-900">Pérola de Fixação: </span>
                                      <span className="text-teal-950">{missed.pearl}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
