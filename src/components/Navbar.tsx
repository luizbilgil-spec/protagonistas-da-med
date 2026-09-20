import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Clock, 
  BookOpen, 
  Stethoscope, 
  ShieldCheck, 
  Award, 
  MessageSquare, 
  BarChart3, 
  Bell, 
  Wifi, 
  WifiOff, 
  Flame, 
  Sparkles,
  Layers,
  CheckCircle2,
  HeartPulse,
  GraduationCap,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { SmartNotification, UserStats } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  userStats: UserStats;
  notifications: SmartNotification[];
  onMarkNotificationRead: (id: string) => void;
  dueCardsCount: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

interface StudyOption {
  id: string;
  label: string;
  shortDesc: string;
  category: 'Simulados & Avaliações' | 'Prática Ativa & Fixação' | 'Planejamento & Apoio';
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  highlight?: boolean;
  accentColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userStats,
  notifications,
  onMarkNotificationRead,
  dueCardsCount,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Close menus on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setShowNotifications(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Handled via backdrop
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  const studyOptions: StudyOption[] = [
    { 
      id: 'fatec', 
      label: 'Valvopatias & Semiologia (Simulado)', 
      shortDesc: '10 questões especializadas de alta densidade, sopros, manobras de Rivero-Carvallo e flashcards SM-2.',
      category: 'Simulados & Avaliações',
      icon: Stethoscope, 
      highlight: true, 
      badge: '10Q + Cards',
      accentColor: 'from-rose-500 to-red-600'
    },
    { 
      id: 'cardio', 
      label: 'Trilha Cardio (6 Temas + Prova)', 
      shortDesc: 'Guia completo com 6 módulos essenciais de cardiologia, podcasts clínicos e prova cronometrada de 20 questões.',
      category: 'Simulados & Avaliações',
      icon: HeartPulse,
      badge: '20Q',
      accentColor: 'from-teal-600 to-emerald-600'
    },
    { 
      id: 'simulado', 
      label: 'Simulado Real de Residência', 
      shortDesc: 'Treinamento completo sob cronômetro rigoroso e estrutura das grandes bancas (USP, UNIFESP, ENARE, SUS-SP).',
      category: 'Simulados & Avaliações',
      icon: Clock,
      accentColor: 'from-amber-500 to-orange-600'
    },
    { 
      id: 'flashcards', 
      label: 'Flashcards SM-2 & Anki Sync', 
      shortDesc: 'Repetição espaçada com algoritmo matemático SM-2 para retenção de anatomia, fármacos e critérios diagnósticos.',
      category: 'Prática Ativa & Fixação',
      icon: Brain, 
      badge: dueCardsCount > 0 ? `${dueCardsCount} para revisar` : 'SM-2 Ativo',
      accentColor: 'from-indigo-500 to-blue-600'
    },
    { 
      id: 'questoes', 
      label: 'Banco de Questões Comentadas', 
      shortDesc: 'Banco de questões com gabarito anatômico, distratores explicados e correlação farmacológica detalhada.',
      category: 'Prática Ativa & Fixação',
      icon: BookOpen,
      accentColor: 'from-teal-600 to-cyan-600'
    },
    { 
      id: 'casos', 
      label: 'Casos Clínicos Interativos', 
      shortDesc: 'Pacientes virtuais em emergência cardiológica e ambulatório para investigação diagnóstica guiada.',
      category: 'Prática Ativa & Fixação',
      icon: GraduationCap,
      accentColor: 'from-purple-500 to-indigo-600'
    },
    { 
      id: 'mentoria', 
      label: 'Mentoria Semanal & Metas', 
      shortDesc: 'Planejamento de estudos, cronômetro de estudo ativo, metas diárias (questões/tempo) e cronograma inteligente.',
      category: 'Planejamento & Apoio',
      icon: Award,
      accentColor: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'pocket', 
      label: 'Guia de Bolso Offline', 
      shortDesc: 'Manual rápido de consulta médica com critérios de Jones, Duke, NYHA, anatomia cardíaca e antiarrítmicos.',
      category: 'Planejamento & Apoio',
      icon: ShieldCheck,
      badge: 'Offline 100%',
      accentColor: 'from-cyan-600 to-sky-700'
    },
    { 
      id: 'forum', 
      label: 'Fórum de Especialistas', 
      shortDesc: 'Comunidade médica para debater questões controversas, condutas de diretrizes e recursos de provas.',
      category: 'Planejamento & Apoio',
      icon: MessageSquare,
      accentColor: 'from-slate-600 to-slate-800'
    },
  ];

  const currentActiveOption = studyOptions.find(opt => opt.id === currentTab) || studyOptions[0];

  const categories: Array<'Simulados & Avaliações' | 'Prática Ativa & Fixação' | 'Planejamento & Apoio'> = [
    'Simulados & Avaliações',
    'Prática Ativa & Fixação',
    'Planejamento & Apoio'
  ];

  const handleSelectOption = (id: string) => {
    onSelectTab(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Hamburger 3-Bars Button with Vertical Dropdown (De Cima para Baixo) + Logo + Active Module Badge */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          {/* Botão com três riscos e Menu Dropdown vertical de cima para baixo */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              id="btn-menu-opcoes-estudo"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Abrir opções de estudo"
              title="Clique para ver as opções de estudo de cima para baixo"
              className={`group flex items-center space-x-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs border select-none ${
                isMenuOpen
                  ? 'bg-teal-700 text-white border-teal-700 ring-2 ring-teal-500/40 shadow-teal-900/20'
                  : 'bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-200 border-teal-300/80 dark:border-teal-700/80 hover:shadow-xs'
              }`}
            >
              {/* Três riscos (ícone Menu / X quando aberto) */}
              <div className="relative w-5 h-5 flex items-center justify-center">
                {isMenuOpen ? (
                  <X className="w-5 h-5 stroke-[2.5] transition-transform rotate-90 duration-200 text-white" />
                ) : (
                  <Menu className="w-5 h-5 stroke-[2.5] transition-transform group-hover:scale-110 duration-200 text-teal-700 dark:text-teal-300" />
                )}
              </div>
              <span className="tracking-tight font-bold whitespace-nowrap">
                Opções de Estudo
              </span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded-md bg-teal-200/70 dark:bg-teal-800 text-teal-900 dark:text-teal-100">
                9
              </span>
            </button>

            {/* Menu Dropdown Vertical (De Cima para Baixo) */}
            {isMenuOpen && (
              <>
                {/* Backdrop para fechar ao clicar fora */}
                <div 
                  className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-2xs" 
                  onClick={() => setIsMenuOpen(false)}
                  aria-hidden="true"
                />

                <div
                  id="dropdown-opcoes-de-cima-para-baixo"
                  className="absolute top-full left-0 mt-2 w-[90vw] sm:w-[420px] max-h-[82vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center space-x-1.5">
                        <Menu className="w-3.5 h-3.5" />
                        <span>Módulos de Estudo</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Selecione a opção desejada de cima para baixo:
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                      aria-label="Fechar menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Lista de Opções estritamente de cima para baixo */}
                  <div className="p-2 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/60">
                    {studyOptions.map((opt, index) => {
                      const Icon = opt.icon;
                      const isActive = currentTab === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          id={`opcao-estudo-${opt.id}`}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer pt-2.5 ${
                            isActive
                              ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-100 border border-teal-500/40 shadow-xs'
                              : 'hover:bg-slate-100/90 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${opt.accentColor} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className={`font-bold text-xs sm:text-sm truncate ${
                                  isActive ? 'text-teal-700 dark:text-teal-300' : 'text-slate-900 dark:text-white'
                                }`}>
                                  {opt.label}
                                </span>
                                {opt.badge && (
                                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md shrink-0 ${
                                    opt.highlight
                                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200'
                                      : 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200'
                                  }`}>
                                    {opt.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-[280px]">
                                {opt.shortDesc}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 ml-2">
                            {isActive ? (
                              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-600 text-white shadow-2xs">
                                Ativo
                              </span>
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50/60 dark:bg-slate-950/40">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      Protagonistas da Med • Algoritmo SM-2 & Estudo Guiado
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Logo & Platform Name: Protagonistas da Med */}
          <div 
            onClick={() => handleSelectOption('fatec')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="hidden min-[480px]:block">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
                  Protagonistas<span className="text-teal-600 dark:text-teal-400"> da Med</span>
                </span>
                <span className="hidden md:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Residência
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">Anatomia & Farmacologia Médica</p>
            </div>
          </div>

          {/* Current Active Option Indicator */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            title="Clique para trocar o módulo de estudo ativo"
            className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors cursor-pointer max-w-[260px]"
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
            <span className="text-slate-400 dark:text-slate-400 text-[11px]">Módulo:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
              {currentActiveOption.label}
            </span>
          </button>
        </div>

        {/* Right Status Indicators & Action Tools */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Offline / Online indicator */}
          <div 
            title={isOnline ? "Conectado aos servidores da nuvem" : "Modo Offline ativo: Todas as questões, flashcards e guia estão disponíveis localmente"}
            className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              isOnline 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-600" /> : <WifiOff className="w-3.5 h-3.5 text-amber-600" />}
            <span className="hidden xl:inline">{isOnline ? 'Online' : 'Offline (Banco Local)'}</span>
          </div>

          {/* Study streak */}
          <div 
            title="Sequência de estudos diários contínuos"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{userStats.streakDays}d</span>
          </div>

          {/* Anki Sync Quick Indicator */}
          <button
            type="button"
            onClick={() => handleSelectOption('flashcards')}
            title="Integração Anki ativa: Decks prontos para exportação e sincronização"
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-medium transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Anki</span>
          </button>

          {/* Interruptor Modo Foco (Dark Theme) */}
          <button
            type="button"
            id="toggle-focus-mode"
            role="switch"
            aria-checked={isDarkMode}
            onClick={onToggleDarkMode}
            title={
              isDarkMode
                ? 'Modo Foco Noturno Ativo: Reduz fadiga visual. Clique para alternar para o Modo Claro.'
                : 'Ativar Modo Foco: Tema escuro para sessões de estudo noturnas.'
            }
            className={`group flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 cursor-pointer select-none shadow-2xs ${
              isDarkMode
                ? 'bg-slate-800 text-teal-300 border-teal-500/40 ring-1 ring-teal-500/30'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200 hover:text-slate-900'
            }`}
          >
            {isDarkMode ? (
              <Moon className="w-3.5 h-3.5 text-teal-400 fill-teal-400/20" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span className="hidden sm:inline font-bold">Foco</span>
            <div
              className={`w-6 h-3 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                isDarkMode ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
            </div>
          </button>

          {/* Smart Notification Dropdown */}
          <div className="relative">
            <button
              id="notifications-button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-hidden"
              aria-label="Notificações inteligentes"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {showNotifications && (
              <div 
                id="notifications-dropdown"
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Notificações Inteligentes</h3>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{unreadNotifs.length} novas</span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">Nenhuma notificação no momento</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onMarkNotificationRead(n.id);
                          if (n.actionRoute) handleSelectOption(n.actionRoute);
                          setShowNotifications(false);
                        }}
                        className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer text-left ${
                          !n.isRead ? 'bg-teal-50/40 dark:bg-teal-950/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">{n.title}</h4>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 px-4 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Algoritmo SM-2 monitorando revisões de curto e longo prazo
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
