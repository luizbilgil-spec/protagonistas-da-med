import React, { useState, useMemo } from 'react';
import { 
  Brain, 
  RotateCw, 
  Download, 
  Upload, 
  Plus, 
  Sparkles, 
  Search, 
  Check, 
  Clock, 
  Tag, 
  Lightbulb, 
  Flame, 
  FileText,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { Flashcard, ReviewRating, Subspecialty, MedicalSubject } from '../types';
import { calculateSM2, isCardDue, getDaysUntilReview } from '../utils/sm2';
import { downloadAnkiDeck, parseAnkiImportText } from '../utils/ankiExport';

interface FlashcardsViewProps {
  cards: Flashcard[];
  onUpdateCards: (cards: Flashcard[]) => void;
  onCardReviewed: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  cards,
  onUpdateCards,
  onCardReviewed,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'Todos' | MedicalSubject>('Todos');
  const [selectedSubspecialty, setSelectedSubspecialty] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<'due_only' | 'all'>('due_only');

  // Modals
  const [showAnkiModal, setShowAnkiModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [ankiImportText, setAnkiImportText] = useState('');
  const [aiTopic, setAiTopic] = useState('Farmacologia dos Anti-hipertensivos e Nefroproteção');
  const [aiFocus, setAiFocus] = useState('Farmacologia');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');

  // New card form state
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newSubject, setNewSubject] = useState<MedicalSubject>('Anatomia');
  const [newSubspecialty, setNewSubspecialty] = useState<Subspecialty>('Neuroanatomia');
  const [newPearl, setNewPearl] = useState('');
  const [newMnemonic, setNewMnemonic] = useState('');
  const [newTags, setNewTags] = useState('');

  // Filter cards based on criteria
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchSubject = selectedSubject === 'Todos' || card.subject === selectedSubject;
      const matchSub = selectedSubspecialty === 'Todas' || card.subspecialty === selectedSubspecialty;
      const matchSearch = searchQuery.trim() === '' || 
        card.front.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.back.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.clinicalPearl?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.ankiTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchMode = studyMode === 'all' || isCardDue(card.sm2.nextReviewDate);

      return matchSubject && matchSub && matchSearch && matchMode;
    });
  }, [cards, selectedSubject, selectedSubspecialty, searchQuery, studyMode]);

  const activeCard: Flashcard | undefined = filteredCards[currentCardIndex % (filteredCards.length || 1)];

  // Subspecialty list based on current selection
  const subspecialties = useMemo(() => {
    const list = new Set(cards.map(c => c.subspecialty));
    return ['Todas', ...Array.from(list)];
  }, [cards]);

  const dueCount = useMemo(() => {
    return cards.filter(c => isCardDue(c.sm2.nextReviewDate)).length;
  }, [cards]);

  const handleReview = (rating: ReviewRating) => {
    if (!activeCard) return;

    const updatedSM2 = calculateSM2(activeCard.sm2, rating);
    const updatedCards = cards.map(c => c.id === activeCard.id ? { ...c, sm2: updatedSM2 } : c);

    onUpdateCards(updatedCards);
    onCardReviewed();
    setIsFlipped(false);

    // Advance to next card or stay if finished
    if (currentCardIndex >= filteredCards.length - 1) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      front: newFront.trim(),
      back: newBack.trim(),
      subject: newSubject,
      subspecialty: newSubspecialty,
      clinicalPearl: newPearl.trim(),
      mnemonic: newMnemonic.trim() || undefined,
      ankiTags: newTags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean),
      sm2: {
        repetitions: 0,
        interval: 0,
        easeFactor: 2.5,
        nextReviewDate: new Date().toISOString(),
        totalReviews: 0,
        lapseCount: 0
      }
    };

    onUpdateCards([newCard, ...cards]);
    setShowAddModal(false);
    setNewFront('');
    setNewBack('');
    setNewPearl('');
    setNewMnemonic('');
    setNewTags('');
  };

  const handleImportAnki = () => {
    if (!ankiImportText.trim()) return;
    const parsed = parseAnkiImportText(ankiImportText);
    if (parsed.length === 0) {
      alert('Nenhum cartão válido encontrado. Verifique o formato exportado pelo Anki (separado por tabulação ou vírgula).');
      return;
    }

    const newCards: Flashcard[] = parsed.map((p, idx) => ({
      id: `imported-${Date.now()}-${idx}`,
      front: p.front || 'Pergunta',
      back: p.back || 'Resposta',
      subject: p.subject || 'Anatomia',
      subspecialty: p.subspecialty || 'Neuroanatomia',
      clinicalPearl: p.clinicalPearl || 'Card importado do Anki',
      ankiTags: p.ankiTags || ['anki_import'],
      sm2: {
        repetitions: 0,
        interval: 0,
        easeFactor: 2.5,
        nextReviewDate: new Date().toISOString(),
        totalReviews: 0,
        lapseCount: 0
      }
    }));

    onUpdateCards([...newCards, ...cards]);
    setShowAnkiModal(false);
    setAnkiImportText('');
  };

  const handleGenerateAiCards = async () => {
    setIsGeneratingAi(true);
    setAiSuccessMessage('');
    try {
      const res = await fetch('/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, focusArea: aiFocus, count: 4 })
      });
      const data = await res.json();
      if (data.cards && Array.isArray(data.cards)) {
        const created: Flashcard[] = data.cards.map((c: any, i: number) => ({
          id: `ai-card-${Date.now()}-${i}`,
          front: c.front,
          back: c.back,
          subject: (aiFocus.includes('Farma') ? 'Farmacologia' : 'Anatomia') as MedicalSubject,
          subspecialty: (c.subspecialty || 'Farmacologia Cardiovascular') as Subspecialty,
          clinicalPearl: c.clinicalPearl || 'Pérola de Residência Médica',
          ankiTags: c.ankiTags ? c.ankiTags.split(' ') : ['residencia', 'medicina'],
          sm2: {
            repetitions: 0,
            interval: 0,
            easeFactor: 2.5,
            nextReviewDate: new Date().toISOString(),
            totalReviews: 0,
            lapseCount: 0
          }
        }));

        onUpdateCards([...created, ...cards]);
        setAiSuccessMessage(`🎉 ${created.length} novos flashcards com repetição espaçada foram adicionados ao seu deck!`);
      }
    } catch (e) {
      console.error(e);
      setAiSuccessMessage('Não foi possível gerar no momento. O deck offline continua 100% ativo.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Anki Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Brain className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Flashcards Médicos & Repetição Espaçada (SM-2)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Algoritmo SM-2 adaptativo: retenha a anatomia cirúrgica e a farmacologia de alta densidade sem esquecer.
          </p>
        </div>

        {/* Integration Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            id="export-anki-button"
            onClick={() => downloadAnkiDeck(cards)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors"
            title="Exportar cartões compatíveis diretamente com Anki (.txt / .apkg tsv)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Anki</span>
          </button>

          <button
            id="import-anki-button"
            onClick={() => setShowAnkiModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importar Anki</span>
          </button>

          <button
            id="ai-generate-button"
            onClick={() => setShowAiModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerar com IA</span>
          </button>

          <button
            id="create-card-button"
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-800 hover:bg-teal-900 text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Criar Card</span>
          </button>
        </div>
      </div>

      {/* Filter and Mode Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Subject Pills */}
          <div className="inline-flex rounded-xl bg-slate-200/70 p-1">
            {(['Todos', 'Anatomia', 'Farmacologia'] as const).map((subj) => (
              <button
                key={subj}
                onClick={() => { setSelectedSubject(subj); setCurrentCardIndex(0); }}
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

          {/* Subspecialty select */}
          <select
            value={selectedSubspecialty}
            onChange={(e) => { setSelectedSubspecialty(e.target.value); setCurrentCardIndex(0); }}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          >
            {subspecialties.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          {/* Study Mode toggle */}
          <div className="inline-flex rounded-xl bg-slate-200/70 p-1">
            <button
              onClick={() => { setStudyMode('due_only'); setCurrentCardIndex(0); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                studyMode === 'due_only'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Pendentes Hoje ({dueCount})</span>
            </button>
            <button
              onClick={() => { setStudyMode('all'); setCurrentCardIndex(0); }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                studyMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Todos ({cards.length})</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar termo ou tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Main Flashcard Study Area */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Nenhum cartão pendente com esses filtros!</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Excelente trabalho! Você revisou todas as repetições espaçadas agendadas para este ciclo. Alterne para "Todos os Cards" ou gere novos cartões com IA para avançar.
          </p>
          <button
            onClick={() => setStudyMode('all')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 transition-colors"
          >
            <span>Ver Todos os {cards.length} Cartões</span>
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Card Counter & Subtitle */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                {activeCard?.subject}
              </span>
              <span>{activeCard?.subspecialty}</span>
            </div>
            <div>
              Cartão {currentCardIndex + 1} de {filteredCards.length}
            </div>
          </div>

          {/* 3D Flashcard interactive box */}
          <div
            id="flashcard-interactive-container"
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[340px] sm:min-h-[380px] bg-white rounded-3xl border-2 border-slate-200 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer p-6 sm:p-8 flex flex-col justify-between select-none relative overflow-hidden"
          >
            {/* Top Badge on card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {isFlipped ? 'RESPOSTA & FUNDAMENTAÇÃO' : 'QUESTÃO CLÍNICA / ANATÔMICA'}
                </span>
                {activeCard && isCardDue(activeCard.sm2.nextReviewDate) && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                    Revisão Hoje
                  </span>
                )}
              </div>
              <div className="text-slate-400 flex items-center space-x-1 text-xs">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Clique para virar</span>
              </div>
            </div>

            {/* Content Front or Back */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug tracking-tight">
                    {activeCard?.front}
                  </h2>
                  <p className="text-xs text-slate-400 italic">
                    Pense na correlação topográfica ou no mecanismo celular antes de virar.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                    {activeCard?.back}
                  </div>

                  {/* Clinical Pearl Box */}
                  {activeCard?.clinicalPearl && (
                    <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-950 text-xs leading-relaxed space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-teal-800">
                        <Lightbulb className="w-3.5 h-3.5 text-teal-600" />
                        <span>Pérola de Residência Médica</span>
                      </div>
                      <p>{activeCard.clinicalPearl}</p>
                    </div>
                  )}

                  {/* Mnemonic Box */}
                  {activeCard?.mnemonic && (
                    <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/60 text-indigo-900 text-xs flex items-center space-x-2">
                      <span className="font-bold text-indigo-700">Mnemônico:</span>
                      <span>{activeCard.mnemonic}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Tags */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {activeCard?.ankiTags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-slate-400">
                Fator de Facilidade: {activeCard?.sm2.easeFactor.toFixed(2)} | Intervalo: {activeCard?.sm2.interval}d
              </div>
            </div>
          </div>

          {/* SM-2 Response Buttons (Displayed when card is flipped) */}
          {isFlipped ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <button
                id="rating-again-button"
                onClick={() => handleReview('again')}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all font-semibold active:scale-98"
              >
                <span className="text-xs sm:text-sm font-bold">Novamente</span>
                <span className="text-[10px] font-normal text-rose-500">1 dia (Errei)</span>
              </button>

              <button
                id="rating-hard-button"
                onClick={() => handleReview('hard')}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all font-semibold active:scale-98"
              >
                <span className="text-xs sm:text-sm font-bold">Difícil</span>
                <span className="text-[10px] font-normal text-amber-600">
                  {Math.max(1, Math.round((activeCard?.sm2.interval || 1) * 1.2))} dias
                </span>
              </button>

              <button
                id="rating-good-button"
                onClick={() => handleReview('good')}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-all font-semibold active:scale-98"
              >
                <span className="text-xs sm:text-sm font-bold">Bom</span>
                <span className="text-[10px] font-normal text-teal-600">
                  {Math.max(1, Math.round((activeCard?.sm2.interval || 1) * (activeCard?.sm2.easeFactor || 2.5)))} dias
                </span>
              </button>

              <button
                id="rating-easy-button"
                onClick={() => handleReview('easy')}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all font-semibold active:scale-98"
              >
                <span className="text-xs sm:text-sm font-bold">Fácil</span>
                <span className="text-[10px] font-normal text-emerald-600">
                  {Math.max(4, Math.round((activeCard?.sm2.interval || 1) * (activeCard?.sm2.easeFactor || 2.5) * 1.3))} dias
                </span>
              </button>
            </div>
          ) : (
            <button
              id="show-answer-button"
              onClick={() => setIsFlipped(true)}
              className="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm shadow-sm transition-all"
            >
              Mostrar Resposta & Detalhes
            </button>
          )}

          {/* Quick Navigation between cards */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
              }}
              className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ← Cartão Anterior
            </button>
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
              }}
              className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Próximo Cartão →
            </button>
          </div>
        </div>
      )}

      {/* Modal: Add Custom Flashcard */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Novo Flashcard Médico</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Matéria</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as MedicalSubject)}
                    className="w-full text-xs border border-slate-300 rounded-xl p-2 bg-white"
                  >
                    <option value="Anatomia">Anatomia</option>
                    <option value="Farmacologia">Farmacologia</option>
                    <option value="Clínica Médica">Clínica Médica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subespecialidade</label>
                  <select
                    value={newSubspecialty}
                    onChange={(e) => setNewSubspecialty(e.target.value as Subspecialty)}
                    className="w-full text-xs border border-slate-300 rounded-xl p-2 bg-white"
                  >
                    <option value="Neuroanatomia">Neuroanatomia</option>
                    <option value="Anatomia Cardiovascular">Anatomia Cardiovascular</option>
                    <option value="Anatomia do Aparelho Locomotor">Anatomia do Aparelho Locomotor</option>
                    <option value="Farmacologia Cardiovascular">Farmacologia Cardiovascular</option>
                    <option value="Farmacologia do SNC">Farmacologia do SNC</option>
                    <option value="Antimicrobianos e Quimioterápicos">Antimicrobianos e Quimioterápicos</option>
                    <option value="Farmacologia Autonômica">Farmacologia Autonômica</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Frente (Pergunta / Acidente Anatômico / Droga)</label>
                <textarea
                  required
                  rows={2}
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  placeholder="Ex: Quais os limites do Trígono Femoral (Scarpa) e quais vasos o atravessam?"
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Verso (Resposta fundamentada)</label>
                <textarea
                  required
                  rows={3}
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  placeholder="Ex: Limites: Ligamento inguinal, músculo sartório e adutor longo. Conteúdo lateral para medial: Nervo, Artéria e Veia Femoral (NAVe)."
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pérola de Residência (Opcional)</label>
                <input
                  type="text"
                  value={newPearl}
                  onChange={(e) => setNewPearl(e.target.value)}
                  placeholder="Ex: Risco de punção acidental da artéria femoral durante acesso venoso central."
                  className="w-full text-xs border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mnemônico (Opcional)</label>
                  <input
                    type="text"
                    value={newMnemonic}
                    onChange={(e) => setNewMnemonic(e.target.value)}
                    placeholder="Ex: NAVe (Nervo, Artéria, Veia)"
                    className="w-full text-xs border border-slate-300 rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tags Anki (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="anatomia, femoral, cirurgia"
                    className="w-full text-xs border border-slate-300 rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-800 hover:bg-teal-900 text-white shadow-xs"
                >
                  Salvar no Deck SM-2
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Import from Anki */}
      {showAnkiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Importar Deck do Anki</h3>
              </div>
              <button onClick={() => setShowAnkiModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              No Anki, selecione seu baralho, clique em <strong>Arquivo → Exportar → Notas em Texto sem formatação (.txt)</strong>. Cole o conteúdo do arquivo abaixo:
            </p>

            <textarea
              rows={6}
              value={ankiImportText}
              onChange={(e) => setAnkiImportText(e.target.value)}
              placeholder="#separator:tab&#10;Pergunta do Anki&#9;Resposta do Anki com pérola&#9;tag1 tag2"
              className="w-full text-xs font-mono border border-slate-300 rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAnkiModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImportAnki}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
              >
                Importar e Integrar com SM-2
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: AI Generator */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-base text-slate-900">Gerador Inteligente de Cards Médicos</h3>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Especifique um tema de Anatomia ou Farmacologia para gerar cards de alto rendimento com pérolas de residência:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Área de Foco</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAiFocus('Farmacologia')}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                      aiFocus === 'Farmacologia' ? 'bg-teal-50 border-teal-500 text-teal-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Farmacologia Clínica
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiFocus('Anatomia')}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                      aiFocus === 'Anatomia' ? 'bg-teal-50 border-teal-500 text-teal-800' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Anatomia Cirúrgica
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tema / Capítulo Médico</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ex: Forames da base do crânio e pares cranianos"
                  className="w-full text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              {aiSuccessMessage && (
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                  {aiSuccessMessage}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Fechar
              </button>
              <button
                type="button"
                disabled={isGeneratingAi || !aiTopic.trim()}
                onClick={handleGenerateAiCards}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-800 hover:bg-teal-900 text-white disabled:opacity-50 flex items-center space-x-2"
              >
                {isGeneratingAi ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Gerando Cards...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gerar 4 Cards</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
