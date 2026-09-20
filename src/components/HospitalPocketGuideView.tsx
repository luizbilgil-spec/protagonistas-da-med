import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Copy, 
  Check, 
  AlertOctagon, 
  MapPin, 
  Pill, 
  Zap,
  Bookmark,
  WifiOff,
  BookOpen
} from 'lucide-react';
import { PocketReferenceItem } from '../types';

interface HospitalPocketGuideViewProps {
  items: PocketReferenceItem[];
}

export const HospitalPocketGuideView: React.FC<HospitalPocketGuideViewProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const list = new Set(items.map(i => i.category));
    return ['Todas', ...Array.from(list)];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat = selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dosages?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.landmarks?.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header with Offline Badge */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Guia de Bolso Rápido Offline (Hospitais & Bibliotecas)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Consulta rápida e imediata de doses críticas de emergência, antídotos e marcos anatômicos de procedimentos. Funciona 100% sem conexão com a internet.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shrink-0">
          <WifiOff className="w-4 h-4 text-emerald-600" />
          <span>Base Local Sincronizada (Zero Latência)</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200/80 text-slate-700 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar fármaco, dose ou marco anatômico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Grid of Pocket Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700">
                  {item.category}
                </span>

                <button
                  onClick={() => handleCopy(item.id, `${item.title}\n${item.dosages || item.content}`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                  title="Copiar dose"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.content}
              </p>

              {/* Dosages if available */}
              {item.dosages && (
                <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-950 text-xs space-y-1">
                  <div className="font-bold flex items-center space-x-1.5 text-teal-900">
                    <Zap className="w-3.5 h-3.5 text-teal-600" />
                    <span>Posologia & Diluição de Emergência</span>
                  </div>
                  <p className="whitespace-pre-line font-mono text-[11px] leading-relaxed text-teal-950">
                    {item.dosages}
                  </p>
                </div>
              )}

              {/* Landmarks if available */}
              {item.landmarks && item.landmarks.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs space-y-1.5">
                  <div className="font-bold flex items-center space-x-1.5 text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Marcos Anatômicos Obrigatórios</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {item.landmarks.map((lm, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                        <span>{lm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Danger zones & Contraindications */}
              {item.dangerZones && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-[11px] flex items-start space-x-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-900">Zona de Perigo / Risco Iatrogênico:</strong> {item.dangerZones}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Disponível offline no dispositivo</span>
              <span className="font-semibold text-teal-700 dark:text-teal-400">Protagonistas da Med Pocket</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
