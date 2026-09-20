export type MedicalSubject = 'Anatomia' | 'Farmacologia' | 'Clínica Médica' | 'Cirurgia' | 'Interdisciplinar';

export type Subspecialty = 
  | 'Neuroanatomia'
  | 'Anatomia Cardiovascular'
  | 'Anatomia do Aparelho Locomotor'
  | 'Anatomia Abdominal e Pélvica'
  | 'Farmacologia Cardiovascular'
  | 'Farmacologia do SNC'
  | 'Farmacologia Autonômica'
  | 'Antimicrobianos e Quimioterápicos'
  | 'Farmacologia Renal e Diuréticos'
  | 'Emergências e Toxicologia';

export interface SM2Data {
  repetitions: number;
  interval: number; // in days
  easeFactor: number; // default 2.5
  nextReviewDate: string; // ISO date string
  lastReviewedDate?: string;
  totalReviews: number;
  lapseCount: number;
}

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'; // 1, 2, 3, 4

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: MedicalSubject;
  subspecialty: Subspecialty;
  clinicalPearl: string;
  mnemonic?: string;
  diagramUrl?: string;
  ankiTags: string[];
  sm2: SM2Data;
  isBookmarked?: boolean;
}

export interface QuestionAlternative {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ResidencyQuestion {
  id: string;
  examBoard: 'USP' | 'UNIFESP' | 'ENARE' | 'SUS-SP' | 'UFRJ' | 'AMRIGS' | 'UNICAMP';
  year: number;
  subject: MedicalSubject;
  subspecialty: Subspecialty;
  statement: string;
  clinicalContext?: string;
  alternatives: QuestionAlternative[];
  professorComment: {
    author: string;
    specialty: string;
    commentary: string;
    pearl: string;
    anatomicalCorrelation?: string;
    pharmacologicalInsight?: string;
  };
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

export interface ClinicalCaseStage {
  id: number;
  title: string;
  description: string;
  patientVitals?: {
    pa: string;
    fc: string;
    fr: string;
    satO2: string;
    temp: string;
    glicemia?: string;
  };
  physicalExam?: string;
  labAndImaging?: string;
  options: {
    id: string;
    action: string;
    isOptimal: boolean;
    consequence: string;
    pharmaNote?: string;
    anatomyNote?: string;
  }[];
}

export interface ClinicalCase {
  id: string;
  title: string;
  patientProfile: string; // e.g. "Homem, 58 anos, hipertenso e tabagista"
  chiefComplaint: string;
  setting: 'Pronto-Socorro' | 'UTI' | 'Enfermaria' | 'Ambulatório';
  subjectFocus: 'Farmacologia' | 'Anatomia' | 'Misto';
  stages: ClinicalCaseStage[];
  summaryConclusion: string;
  keyLearningPoints: string[];
}

export interface PocketReferenceItem {
  id: string;
  title: string;
  category: 'Drogas de Emergência' | 'Marcos Anatômicos de Procedimento' | 'Antídotos' | 'Ajuste Renal de Fármacos';
  content: string;
  dosages?: string;
  contraindications?: string;
  landmarks?: string[];
  dangerZones?: string;
}

export type AppTab = 'fatec' | 'cardio' | 'simulado' | 'flashcards' | 'questoes' | 'casos' | 'pocket' | 'mentoria' | 'forum';

export type CardioTopicId = 
  | 'dac' 
  | 'disseccao' 
  | 'miocardite' 
  | 'aneurisma' 
  | 'hipertensao' 
  | 'valvopatias';

export interface CardioTopicMeta {
  id: CardioTopicId;
  title: string;
  shortDesc: string;
  keyConcepts: string[];
  iconName: string;
  questionCount: number;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorRole: 'Estudante' | 'Residente R2' | 'Médico Preceptor' | 'Especialista Convidado';
  date: string;
  category: MedicalSubject;
  content: string;
  upvotes: number;
  userHasUpvoted?: boolean;
  answers: {
    id: string;
    author: string;
    authorRole: string;
    date: string;
    text: string;
    isVerifiedExpert?: boolean;
    upvotes?: number;
  }[];
}

export interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'review_due' | 'simulado_reminder' | 'clinical_pearl' | 'streak_alert';
  timestamp: string;
  isRead: boolean;
  actionRoute?: string;
}

export type StudyNotification = SmartNotification;

export interface UserStats {
  streakDays: number;
  totalCardsReviewed: number;
  cardsMastered: number;
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;
  simulatedExamsCompleted: number;
  averageScorePercent: number;
  studyTimeMinutesToday: number;
  dailyGoalCards: number;
  dailyGoalQuestions: number;
  dailyGoalStudyMinutes?: number;
  dailyQuestionsToday?: number;
  dailyGoalType?: 'questions' | 'time' | 'both';
  lastStudyDate: string;
}
