import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  Compass, 
  RotateCw,
  BookOpen,
  ArrowRight,
  Flame
} from 'lucide-react';
import { UserStats } from '../types';
import { DailyGoalTracker } from './DailyGoalTracker';

interface MentorshipViewProps {
  stats: UserStats;
  onUpdateStats?: (updatedStats: UserStats) => void;
  onNavigateToQuestions?: () => void;
}

export const MentorshipView: React.FC<MentorshipViewProps> = ({
  stats,
  onUpdateStats,
  onNavigateToQuestions
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({
    'w1-m1': true,
    'w1-m2': true,
  });

  // AI Mentorship generation state
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [mentorshipPlan, setMentorshipPlan] = useState<{
    summary: string;
    diagnosis: string;
    weeklyGoals: string[];
    highYieldTopics?: string[];
    specialistAdvice: string;
  } | null>({
    summary: 'Auditoria Semanal - Foco: Farmacologia Cardiovascular e Neuroanatomia Topográfica',
    diagnosis: 'Sua taxa de retenção global no SM-2 está em 78%, o que é muito competitivo para a primeira fase do ENARE e USP. No entanto, foram identificados lapsos frequentes em dosagens de drogas vasoativas de emergência e nos ramos do plexo braquial.',
    weeklyGoals: [
      'Revisar diariamente os 30 flashcards calculados pelo algoritmo SM-2 antes das 10h.',
      'Executar 1 simulado cronometrado de 30 minutos focado exclusivamente na banca USP / ENARE.',
      'Finalizar o caso clínico de Dissecção Aguda de Aorta com ênfase na relação dP/dt e uso de betabloqueadores.',
      'Exportar o deck semanal para o Anki para consulta rápida no hospital/estágio.'
    ],
    highYieldTopics: [
      'Plexo Braquial e lesões nervosas altas vs baixas',
      'Inibidores da ECA vs BRA vs Sacubitril/Valsartana (washout de 36h)',
      'Polígono de Willis e acidentes vasculares isquêmicos/hemorrágicos',
      'Antídotos em Toxicologia Clínica (Naloxona, Flumazenil, Atropina)'
    ],
    specialistAdvice: 'Nas provas de residência mais concorridas do país, a correlação entre o mecanismo fisiopatológico e a intervenção farmacológica responde por mais de 35% das questões de alta discriminação. Não decore apenas a alternativa; entenda o porquê de cada contraindicação!'
  });

  const toggleMilestone = (id: string) => {
    setCompletedMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerateFreshPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const res = await fetch('/api/ai/mentorship-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: 'Estudante de Medicina',
          anatomyScore: 78,
          pharmaScore: 74,
          weakTopics: ['Plexo braquial', 'Betabloqueadores', 'Drogas de PCR'],
          totalReviewed: stats.totalCardsReviewed
        })
      });
      const data = await res.json();
      if (data.summary) {
        setMentorshipPlan(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const weeksRoadmap = [
    {
      week: 1,
      title: 'Semana 1: Fundamentos de Neuroanatomia & Farmacologia Autonômica',
      description: 'Pares cranianos, vias motoras/sensitivas, receptores adrenérgicos e colinérgicos.',
      milestones: [
        { id: 'w1-m1', label: 'Dominar os 12 pares cranianos e seus forames no crânio' },
        { id: 'w1-m2', label: 'Revisar agonistas e antagonistas alfa e beta-adrenérgicos' },
        { id: 'w1-m3', label: 'Concluir 1 Simulado de 15 questões USP' },
      ]
    },
    {
      week: 2,
      title: 'Semana 2: Anatomia Cardiovascular & Fármacos da Hipertensão / ICFEr',
      description: 'Câmaras cardíacas, irrigação coronariana, IECA, BRA, betabloqueadores, ARNI e espironolactona.',
      milestones: [
        { id: 'w2-m1', label: 'Mapear a anatomia das artérias coronárias e dominância' },
        { id: 'w2-m2', label: 'Memorizar o quarteto fantástico da ICFEr e o washout de 36h do ARNI' },
        { id: 'w2-m3', label: 'Resolver o caso de Crise Hipertensiva e Dissecção Aórtica' },
      ]
    },
    {
      week: 3,
      title: 'Semana 3: Aparelho Locomotor & Antimicrobianos de Primeira Linha',
      description: 'Plexo braquial, lombossacral, penicilinas, cefalosporinas, quinolonas e aminoglicosídeos.',
      milestones: [
        { id: 'w3-m1', label: 'Revisar fraturas diafisárias de úmero e lesão do nervo radial' },
        { id: 'w3-m2', label: 'Diferenciar toxicidade de aminoglicosídeos vs vancomicina' },
        { id: 'w3-m3', label: 'Exportar baralho atualizado para o Anki Mobile' },
      ]
    },
    {
      week: 4,
      title: 'Semana 4: Anatomia Cirúrgica Abdominal & Emergências Toxicológicas',
      description: 'Trígono de Calot, feixe mesentérico, antídotos em overdose de opioides e benzodiazepínicos.',
      milestones: [
        { id: 'w4-m1', label: 'Fixar os limites do trígono hepatocístico de Calot na colecistectomia' },
        { id: 'w4-m2', label: 'Dominar doses e farmacocinética da Naloxona e Flumazenil' },
        { id: 'w4-m3', label: 'Simulado geral de 30 questões cronometrado' },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Mentorship Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Award className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Mentoria Personalizada Semanal para Provas de Residência
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Planejamento estratégico adaptativo baseado no seu histórico de erros, retenção SM-2 e bancas mais concorridas.
          </p>
        </div>

        <button
          onClick={handleGenerateFreshPlan}
          disabled={isGeneratingPlan}
          className="px-4 py-2.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          {isGeneratingPlan ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Gerando Nova Prescrição...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Atualizar Auditoria de Mentoria</span>
            </>
          )}
        </button>
      </div>

      {/* Daily Study Goals Configuration & Visual Progress Feedback */}
      <DailyGoalTracker
        stats={stats}
        onUpdateStats={onUpdateStats}
        onNavigateToQuestions={onNavigateToQuestions}
      />

      {/* Main Mentorship Plan Prescription Card */}
      {mentorshipPlan && (
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
                Prescrição Pedagógica Semanal
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {mentorshipPlan.summary}
              </h2>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Diretriz Atualizada</span>
            </div>
          </div>

          {/* Diagnostic Box */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-teal-300 block mb-1 text-xs uppercase font-bold">Diagnóstico de Rendimento:</strong>
            {mentorshipPlan.diagnosis}
          </div>

          {/* Weekly Goals Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center space-x-2">
              <Target className="w-4 h-4 text-teal-400" />
              <span>Metas Acionáveis desta Semana</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mentorshipPlan.weeklyGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs flex items-start space-x-3"
                >
                  <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-100 font-medium leading-relaxed">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High-Yield Topics to Master */}
          {mentorshipPlan.highYieldTopics && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                Temas Quentes Obrigatórios para a Semana
              </span>
              <div className="flex flex-wrap gap-2">
                {mentorshipPlan.highYieldTopics.map((topic, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-teal-900/40 border border-teal-500/20 text-teal-200 text-xs font-medium">
                    🔥 {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Specialist Advice */}
          <div className="p-4 rounded-2xl bg-teal-900/30 border border-teal-500/30 text-xs text-teal-100 italic space-y-1">
            <strong className="not-italic text-teal-300 font-bold flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Conselho de Ouro do Preceptor de Residência:</span>
            </strong>
            <p className="leading-relaxed">"{mentorshipPlan.specialistAdvice}"</p>
          </div>
        </div>
      )}

      {/* 12-Week Residency Roadmap Tracker */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Cronograma Semanal de Preparação para Residência
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Acompanhe o avanço das semanas de conteúdo focado e valide cada meta cumprida.
          </p>
        </div>

        <div className="space-y-4">
          {weeksRoadmap.map((wk) => (
            <div
              key={wk.week}
              className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all space-y-3 bg-slate-50/50"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  {wk.title}
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Semana {wk.week}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {wk.description}
              </p>

              {/* Milestones check */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                {wk.milestones.map((m) => {
                  const isDone = Boolean(completedMilestones[m.id]);
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleMilestone(m.id)}
                      className="flex items-center space-x-2.5 text-xs text-slate-700 cursor-pointer select-none hover:text-slate-900"
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                        isDone ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className={isDone ? 'line-through text-slate-400' : 'font-medium'}>
                        {m.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
