import { Flashcard, ResidencyQuestion, ClinicalCase, PocketReferenceItem, ForumPost, SmartNotification, UserStats } from '../types';
import { INITIAL_FLASHCARDS, INITIAL_QUESTIONS, INITIAL_CLINICAL_CASES, INITIAL_POCKET_GUIDE, INITIAL_FORUM_POSTS, INITIAL_NOTIFICATIONS, INITIAL_USER_STATS } from '../data/mockData';

const KEYS = {
  FLASHCARDS: 'synapsemed_flashcards',
  QUESTIONS: 'synapsemed_questions',
  CASES: 'synapsemed_cases',
  POCKET: 'synapsemed_pocket',
  FORUM: 'synapsemed_forum',
  NOTIFICATIONS: 'synapsemed_notifications',
  STATS: 'synapsemed_stats',
  EXAM_HISTORY: 'synapsemed_exam_history',
  DARK_MODE: 'synapsemed_focus_mode_dark',
};

export function loadFlashcards(): Flashcard[] {
  try {
    const saved = localStorage.getItem(KEYS.FLASHCARDS);
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  } catch (e) {
    console.error("Storage read error", e);
    return INITIAL_FLASHCARDS;
  }
}

export function saveFlashcards(cards: Flashcard[]): void {
  try {
    localStorage.setItem(KEYS.FLASHCARDS, JSON.stringify(cards));
  } catch (e) {
    console.error("Storage write error", e);
  }
}

export function loadQuestions(): ResidencyQuestion[] {
  try {
    const saved = localStorage.getItem(KEYS.QUESTIONS);
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  } catch (e) {
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestions(questions: ResidencyQuestion[]): void {
  try {
    localStorage.setItem(KEYS.QUESTIONS, JSON.stringify(questions));
  } catch (e) {
    console.error("Storage write error", e);
  }
}

export function loadCases(): ClinicalCase[] {
  try {
    const saved = localStorage.getItem(KEYS.CASES);
    return saved ? JSON.parse(saved) : INITIAL_CLINICAL_CASES;
  } catch (e) {
    return INITIAL_CLINICAL_CASES;
  }
}

export function saveCases(cases: ClinicalCase[]): void {
  try {
    localStorage.setItem(KEYS.CASES, JSON.stringify(cases));
  } catch (e) {
    console.error("Storage write error", e);
  }
}

export function loadPocketGuide(): PocketReferenceItem[] {
  try {
    const saved = localStorage.getItem(KEYS.POCKET);
    return saved ? JSON.parse(saved) : INITIAL_POCKET_GUIDE;
  } catch (e) {
    return INITIAL_POCKET_GUIDE;
  }
}

export function savePocketGuide(items: PocketReferenceItem[]): void {
  try {
    localStorage.setItem(KEYS.POCKET, JSON.stringify(items));
  } catch (e) {
    console.error("Storage write error", e);
  }
}

export function loadForumPosts(): ForumPost[] {
  try {
    const saved = localStorage.getItem(KEYS.FORUM);
    return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
  } catch (e) {
    return INITIAL_FORUM_POSTS;
  }
}

export function saveForumPosts(posts: ForumPost[]): void {
  try {
    localStorage.setItem(KEYS.FORUM, JSON.stringify(posts));
  } catch (e) {
    console.error("Storage write error", e);
  }
}

export function loadNotifications(): SmartNotification[] {
  try {
    const saved = localStorage.getItem(KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  } catch (e) {
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveNotifications(notifs: SmartNotification[]): void {
  try {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  } catch (e) {
    console.error("Storage write error", e);
  }
}

export function loadUserStats(): UserStats {
  try {
    const saved = localStorage.getItem(KEYS.STATS);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_USER_STATS,
        ...parsed,
        dailyGoalQuestions: parsed.dailyGoalQuestions ?? INITIAL_USER_STATS.dailyGoalQuestions,
        dailyGoalStudyMinutes: parsed.dailyGoalStudyMinutes ?? INITIAL_USER_STATS.dailyGoalStudyMinutes ?? 60,
        dailyQuestionsToday: parsed.dailyQuestionsToday ?? INITIAL_USER_STATS.dailyQuestionsToday ?? 11,
        studyTimeMinutesToday: parsed.studyTimeMinutesToday ?? INITIAL_USER_STATS.studyTimeMinutesToday ?? 45,
        dailyGoalType: parsed.dailyGoalType ?? INITIAL_USER_STATS.dailyGoalType ?? 'both',
      };
    }
    return INITIAL_USER_STATS;
  } catch (e) {
    return INITIAL_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.error("Storage write error", e);
  }
}

export function loadClinicalCases(): ClinicalCase[] {
  return loadCases();
}

export function saveClinicalCases(cases: ClinicalCase[]): void {
  saveCases(cases);
}

export function generateSmartNotifications(cards: Flashcard[], stats: UserStats): SmartNotification[] {
  const existing = loadNotifications();
  const dueCount = cards.filter(c => new Date(c.sm2.nextReviewDate) <= new Date()).length;
  
  const generated: SmartNotification[] = [];

  if (dueCount > 0) {
    generated.push({
      id: 'notif-due-today',
      title: 'Repetição Espaçada Pendente',
      message: `Você tem ${dueCount} flashcard(s) agendados pelo SM-2 para consolidação hoje.`,
      type: 'review_due',
      timestamp: 'Hoje',
      isRead: false,
      actionRoute: 'flashcards'
    });
  }

  if (stats.streakDays >= 3) {
    generated.push({
      id: 'notif-streak',
      title: `${stats.streakDays} Dias Consecutivos!`,
      message: 'Excelente consistência. A neuroplasticidade e retenção em longo prazo aumentam com a prática ininterrupta.',
      type: 'streak_alert',
      timestamp: 'Hoje',
      isRead: false
    });
  }

  // Merge with existing non-duplicate notifications
  const all = [...generated, ...existing.filter(e => !generated.some(g => g.id === e.id))];
  return all;
}

export function clearAllLocalData(): void {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}

export function loadDarkMode(): boolean {
  try {
    const saved = localStorage.getItem(KEYS.DARK_MODE);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference if available
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {
    return false;
  }
}

export function saveDarkMode(isDark: boolean): void {
  try {
    localStorage.setItem(KEYS.DARK_MODE, JSON.stringify(isDark));
  } catch (e) {
    console.error("Storage write error for theme", e);
  }
}
