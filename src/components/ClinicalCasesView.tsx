import React, { useState } from 'react';
import { 
  Stethoscope, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Heart, 
  ShieldAlert, 
  MessageSquare,
  Send,
  Loader2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { ClinicalCase, ClinicalCaseStage } from '../types';

interface ClinicalCasesViewProps {
  cases: ClinicalCase[];
}

export const ClinicalCasesView: React.FC<ClinicalCasesViewProps> = ({ cases }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isStageSubmitted, setIsStageSubmitted] = useState<boolean>(false);

  // AI Preceptor discussion
  const [userCustomQuestion, setUserCustomQuestion] = useState<string>('');
  const [aiPreceptorReply, setAiPreceptorReply] = useState<string | null>(null);
  const [isAskingAi, setIsAskingAi] = useState<boolean>(false);

  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];
  const currentStage: ClinicalCaseStage | undefined = activeCase?.stages[currentStageIndex];
  const isCaseCompleted = currentStageIndex >= (activeCase?.stages.length || 0);

  const handleSelectOption = (optId: string) => {
    if (isStageSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitDecision = () => {
    if (!selectedOptionId) return;
    setIsStageSubmitted(true);
  };

  const handleNextStage = () => {
    setSelectedOptionId(null);
    setIsStageSubmitted(false);
    setCurrentStageIndex(prev => prev + 1);
    setAiPreceptorReply(null);
  };

  const handleRestartCase = () => {
    setCurrentStageIndex(0);
    setSelectedOptionId(null);
    setIsStageSubmitted(false);
    setAiPreceptorReply(null);
  };

  const chosenOption = currentStage?.options.find(o => o.id === selectedOptionId);

  const handleAskAIPreceptor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCustomQuestion.trim() || isAskingAi) return;

    setIsAskingAi(true);
    try {
      const res = await fetch('/api/ai/case-preceptor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseTitle: activeCase.title,
          caseScenario: activeCase.patientProfile + ' - ' + activeCase.chiefComplaint,
          userDecision: chosenOption ? chosenOption.action : 'Discussão de conduta',
          stage: currentStage?.title || 'Fase de Resolução',
          question: userCustomQuestion,
        })
      });
      const data = await res.json();
      setAiPreceptorReply(data.feedback || data.pearl || 'Conduta condizente com as diretrizes.');
    } catch (err) {
      console.error(err);
      setAiPreceptorReply('Excelente colocação. Em ambiente hospitalar crítico, mantenha o foco na estabilização hemodinâmica antes de qualquer intervenção diagnóstica demorada.');
    } finally {
      setIsAskingAi(false);
      setUserCustomQuestion('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Selector Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Simulador de Casos Clínicos Reais
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Decisões terapêuticas sob pressão: cada dosagem farmacológica e marco anatômico cirúrgico determina o desfecho do paciente.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCaseId(c.id);
                handleRestartCase();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCaseId === c.id
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {activeCase && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Patient Profile & Bedside Chart (1 col) */}
          <div className="space-y-4">
            {/* Patient Header Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                  {activeCase.setting}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Foco: {activeCase.subjectFocus}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {activeCase.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeCase.patientProfile}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-950 text-xs space-y-1">
                <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Queixa Principal</span>
                </div>
                <p>{activeCase.chiefComplaint}</p>
              </div>

              {/* Patient Vitals Monitor */}
              {currentStage?.patientVitals && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>SINAIS VITAIS</span>
                    </span>
                    <span className="text-emerald-400 font-bold">MONITOR ATIVO</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 text-[10px] block">PA</span>
                      <span className="text-white font-bold">{currentStage.patientVitals.pa}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 text-[10px] block">FC</span>
                      <span className="text-rose-400 font-bold">{currentStage.patientVitals.fc}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 text-[10px] block">SatO2</span>
                      <span className="text-cyan-400 font-bold">{currentStage.patientVitals.satO2}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 text-[10px] block">Temp</span>
                      <span className="text-amber-400 font-bold">{currentStage.patientVitals.temp}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Preceptor Quick Consultation Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h4 className="font-bold text-xs text-slate-900">Preceptor Médico com IA</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Tire dúvidas de farmacocinética, dosagens ou acessos cirúrgicos sobre este caso específico.
              </p>

              <form onSubmit={handleAskAIPreceptor} className="space-y-2">
                <input
                  type="text"
                  value={userCustomQuestion}
                  onChange={(e) => setUserCustomQuestion(e.target.value)}
                  placeholder="Ex: Por que não usar vasodilatador isolado?"
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={isAskingAi || !userCustomQuestion.trim()}
                  className="w-full py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold disabled:opacity-50 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  {isAskingAi ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Consultando Preceptor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Perguntar ao Preceptor</span>
                    </>
                  )}
                </button>
              </form>

              {aiPreceptorReply && (
                <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 space-y-1.5 animate-in fade-in">
                  <div className="font-bold text-teal-900 flex items-center space-x-1">
                    <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                    <span>Resposta do Preceptor</span>
                  </div>
                  <p className="leading-relaxed">{aiPreceptorReply}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Stage & Decisions (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {!isCaseCompleted && currentStage ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                {/* Stage Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Etapa {currentStageIndex + 1} de {activeCase.stages.length}</span>
                    <span>{currentStage.title}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-700 rounded-full transition-all"
                      style={{ width: `${((currentStageIndex + 1) / activeCase.stages.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Scenario details */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    {currentStage.description}
                  </h3>

                  {currentStage.physicalExam && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                      <strong className="text-slate-800">Exame Físico Dirigido:</strong>
                      <p className="text-slate-700 leading-relaxed">{currentStage.physicalExam}</p>
                    </div>
                  )}

                  {currentStage.labAndImaging && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                      <strong className="text-slate-800">Exames Complementares Rápidos:</strong>
                      <p className="text-slate-700 leading-relaxed">{currentStage.labAndImaging}</p>
                    </div>
                  )}
                </div>

                {/* Decision Options */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Qual a sua conduta médica prioritária agora?
                  </h4>

                  {currentStage.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    let cardStyle = 'border-slate-200 hover:border-slate-300 bg-white';

                    if (isStageSubmitted) {
                      if (opt.isOptimal) {
                        cardStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-950';
                      } else if (isSelected && !opt.isOptimal) {
                        cardStyle = 'border-rose-400 bg-rose-50/60 text-rose-950';
                      } else {
                        cardStyle = 'border-slate-100 bg-slate-50/40 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      cardStyle = 'border-teal-600 bg-teal-50/60 shadow-xs';
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${cardStyle}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                            isSelected ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <p className="text-xs sm:text-sm font-medium leading-relaxed">
                            {opt.action}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Feedback Box (Shown after submit) */}
                {isStageSubmitted && chosenOption && (
                  <div className={`p-5 rounded-2xl border-2 space-y-3 animate-in fade-in duration-200 ${
                    chosenOption.isOptimal
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}>
                    <div className="flex items-center space-x-2 font-bold text-sm">
                      {chosenOption.isOptimal ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Conduta Adequada & Justificada</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600" />
                          <span>Conduta Inadequada para o Cenário</span>
                        </>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed">
                      {chosenOption.consequence}
                    </p>

                    {chosenOption.pharmaNote && (
                      <div className="p-3 rounded-xl bg-white/80 border border-current/20 text-xs">
                        <strong>Farmacologia Aplicada:</strong> {chosenOption.pharmaNote}
                      </div>
                    )}

                    {chosenOption.anatomyNote && (
                      <div className="p-3 rounded-xl bg-white/80 border border-current/20 text-xs">
                        <strong>Relação Anatômica:</strong> {chosenOption.anatomyNote}
                      </div>
                    )}
                  </div>
                )}

                {/* Stage Action Controls */}
                <div className="flex justify-end pt-2">
                  {!isStageSubmitted ? (
                    <button
                      disabled={!selectedOptionId}
                      onClick={handleSubmitDecision}
                      className="px-6 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs disabled:opacity-40 transition-all shadow-xs"
                    >
                      Confirmar Decisão Médica
                    </button>
                  ) : (
                    <button
                      onClick={handleNextStage}
                      className="px-6 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs transition-all shadow-xs flex items-center space-x-2"
                    >
                      <span>
                        {currentStageIndex < activeCase.stages.length - 1 ? 'Avançar para Próxima Etapa' : 'Concluir Caso Clínico'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Case Complete Debrief */
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-center">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Caso Clínico Concluído com Sucesso!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    {activeCase.summaryConclusion}
                  </p>
                </div>

                {/* Key learning points */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3 max-w-xl mx-auto">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Pontos-Chave de Aprendizado para a Residência</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activeCase.keyLearningPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleRestartCase}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir Este Caso</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
