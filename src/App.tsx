import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FatecExamView } from './components/FatecExamView';
import { CardioStudyHubView } from './components/CardioStudyHubView';
import { FlashcardsView } from './components/FlashcardsView';
import { ResidencyExamView } from './components/ResidencyExamView';
import { QuestionBankView } from './components/QuestionBankView';
import { ClinicalCasesView } from './components/ClinicalCasesView';
import { HospitalPocketGuideView } from './components/HospitalPocketGuideView';
import { MentorshipView } from './components/MentorshipView';
import { MedicalForumView } from './components/MedicalForumView';

import {
  Flashcard,
  ResidencyQuestion,
  ClinicalCase,
  PocketReferenceItem,
  ForumPost,
  UserStats,
  StudyNotification,
  AppTab
} from './types';

import {
  loadFlashcards,
  saveFlashcards,
  loadQuestions,
  saveQuestions,
  loadClinicalCases,
  loadPocketGuide,
  loadForumPosts,
  saveForumPosts,
  loadUserStats,
  saveUserStats,
  generateSmartNotifications,
  loadDarkMode,
  saveDarkMode
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('fatec');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [questions, setQuestions] = useState<ResidencyQuestion[]>([]);
  const [clinicalCases, setClinicalCases] = useState<ClinicalCase[]>([]);
  const [pocketItems, setPocketItems] = useState<PocketReferenceItem[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats());
  const [notifications, setNotifications] = useState<StudyNotification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => loadDarkMode());
  const [themeFeedback, setThemeFeedback] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Synchronize documentElement dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveDarkMode(isDarkMode);
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      setThemeFeedback(
        next
          ? 'Modo Foco Ativado: Atenuação de luz azul e contraste suave para estudos noturnos.'
          : 'Modo Padrão Ativado.'
      );
      setTimeout(() => setThemeFeedback(null), 3200);
      return next;
    });
  };

  // Initialize data from local storage
  useEffect(() => {
    const loadedCards = loadFlashcards();
    const loadedQ = loadQuestions();
    const loadedCases = loadClinicalCases();
    const loadedPocket = loadPocketGuide();
    const loadedPosts = loadForumPosts();
    const loadedStats = loadUserStats();

    setFlashcards(loadedCards);
    setQuestions(loadedQ);
    setClinicalCases(loadedCases);
    setPocketItems(loadedPocket);
    setForumPosts(loadedPosts);
    setUserStats(loadedStats);

    const initialNotifs = generateSmartNotifications(loadedCards, loadedStats);
    setNotifications(initialNotifs);

    setIsLoaded(true);
  }, []);

  // Update notifications when flashcards or stats change
  useEffect(() => {
    if (isLoaded) {
      const updatedNotifs = generateSmartNotifications(flashcards, userStats);
      setNotifications(updatedNotifs);
    }
  }, [flashcards, userStats, isLoaded]);

  // Flashcards state management
  const handleUpdateFlashcards = (updated: Flashcard[]) => {
    setFlashcards(updated);
    saveFlashcards(updated);
  };

  const handleCardReviewed = () => {
    setUserStats(prev => {
      const updated: UserStats = {
        ...prev,
        totalCardsReviewed: prev.totalCardsReviewed + 1,
        studyTimeMinutesToday: prev.studyTimeMinutesToday + 1,
      };
      saveUserStats(updated);
      return updated;
    });
  };

  // Question bank answer
  const handleAnswerQuestion = (questionId: string, isCorrect: boolean) => {
    setUserStats(prev => {
      const newTotal = prev.totalQuestionsAnswered + 1;
      const newCorrect = prev.totalQuestionsCorrect + (isCorrect ? 1 : 0);
      const newDailyQ = (prev.dailyQuestionsToday ?? 0) + 1;
      const updated: UserStats = {
        ...prev,
        dailyQuestionsToday: newDailyQ,
        totalQuestionsAnswered: newTotal,
        totalQuestionsCorrect: newCorrect,
        averageScorePercent: Math.round((newCorrect / newTotal) * 100),
      };
      saveUserStats(updated);
      return updated;
    });
  };

  // Exam completion
  const handleExamComplete = (score: number, total: number) => {
    setUserStats(prev => {
      const newTotal = prev.totalQuestionsAnswered + total;
      const newCorrect = prev.totalQuestionsCorrect + score;
      const newDailyQ = (prev.dailyQuestionsToday ?? 0) + total;
      const updated: UserStats = {
        ...prev,
        simulatedExamsCompleted: prev.simulatedExamsCompleted + 1,
        dailyQuestionsToday: newDailyQ,
        totalQuestionsAnswered: newTotal,
        totalQuestionsCorrect: newCorrect,
        averageScorePercent: Math.round((newCorrect / newTotal) * 100),
      };
      saveUserStats(updated);
      return updated;
    });
  };

  const handleUpdateUserStats = (updated: UserStats) => {
    setUserStats(updated);
    saveUserStats(updated);
  };

  // Forum actions
  const handleAddForumPost = (post: ForumPost) => {
    const updated = [post, ...forumPosts];
    setForumPosts(updated);
    saveForumPosts(updated);
  };

  const handleAddForumAnswer = (postId: string, text: string) => {
    const updated = forumPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          answers: [
            ...p.answers,
            {
              id: `ans-${Date.now()}`,
              author: 'Estudante de Medicina',
              authorRole: 'Estudante',
              date: 'Agora mesmo',
              text,
              isVerifiedExpert: false,
              upvotes: 0
            }
          ]
        };
      }
      return p;
    });
    setForumPosts(updated);
    saveForumPosts(updated);
  };

  const handleToggleUpvote = (postId: string) => {
    const updated = forumPosts.map(p => {
      if (p.id === postId) {
        const hasVoted = p.userHasUpvoted;
        return {
          ...p,
          upvotes: hasVoted ? p.upvotes - 1 : p.upvotes + 1,
          userHasUpvoted: !hasVoted
        };
      }
      return p;
    });
    setForumPosts(updated);
    saveForumPosts(updated);
  };

  // Notification dismiss
  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const dueCardsCount = flashcards.filter(c => new Date(c.sm2.nextReviewDate) <= new Date()).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600">Carregando Protagonistas da Med...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'dark bg-slate-950 text-slate-100 selection:bg-teal-900 selection:text-teal-200' 
        : 'bg-slate-50/80 text-slate-900 selection:bg-teal-100 selection:text-teal-900'
    }`}>
      {/* Top Navigation */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab as AppTab)}
        userStats={userStats}
        notifications={notifications}
        onMarkNotificationRead={handleDismissNotification}
        dueCardsCount={dueCardsCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Floating Theme Toast Feedback */}
      {themeFeedback && (
        <aside 
          aria-label="Status do Modo Foco"
          className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-sm pointer-events-none"
        >
          <div className="bg-slate-900/95 text-white dark:bg-slate-800/95 dark:text-slate-100 px-4 py-3 rounded-2xl shadow-xl border border-teal-500/30 flex items-center space-x-3 backdrop-blur text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
            <p>{themeFeedback}</p>
          </div>
        </aside>
      )}

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'fatec' && (
          <FatecExamView
            onAddScoreToStats={(correct, total) => handleExamComplete(correct, total)}
          />
        )}

        {activeTab === 'cardio' && (
          <CardioStudyHubView
            onAddScoreToStats={(correct, total) => handleExamComplete(correct, total)}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            cards={flashcards}
            onUpdateCards={handleUpdateFlashcards}
            onCardReviewed={handleCardReviewed}
          />
        )}

        {activeTab === 'simulado' && (
          <ResidencyExamView
            questions={questions}
            onExamComplete={handleExamComplete}
          />
        )}

        {activeTab === 'questoes' && (
          <QuestionBankView
            questions={questions}
            onAnswerQuestion={handleAnswerQuestion}
          />
        )}

        {activeTab === 'casos' && (
          <ClinicalCasesView
            cases={clinicalCases}
          />
        )}

        {activeTab === 'pocket' && (
          <HospitalPocketGuideView
            items={pocketItems}
          />
        )}

        {activeTab === 'mentoria' && (
          <MentorshipView
            stats={userStats}
            onUpdateStats={handleUpdateUserStats}
            onNavigateToQuestions={() => setActiveTab('questoes')}
          />
        )}

        {activeTab === 'forum' && (
          <MedicalForumView
            posts={forumPosts}
            onAddPost={handleAddForumPost}
            onAddAnswer={handleAddForumAnswer}
            onToggleUpvote={handleToggleUpvote}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 dark:text-slate-100">Protagonistas da Med</span>
            <span>• Plataforma Médica de Alta Performance para Anatomia & Farmacologia</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400 dark:text-slate-500">
            <span>Algoritmo SM-2 Ativo</span>
            <span>• Suporte Offline Completo</span>
            <span>• Compatível com Anki</span>
            {isDarkMode && <span className="text-teal-400 font-semibold">• Modo Foco Ativo</span>}
          </div>
        </div>
      </footer>
    </div>
  );
}
