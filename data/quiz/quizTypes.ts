export type QuestionCategory = 'interest' | 'skill' | 'personality' | 'academic';
export type QuestionType = 'multiple_choice' | 'scale' | 'situational';

export interface QuizOption {
  text: string;
  value: string | number;
  associated_tags?: string[]; // e.g., ["coding", "logic"] for skills/interests
}

export interface QuizQuestion {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  question_text: string;
  options: QuizOption[];
}

export interface QuizResponse {
  question_id: string;
  selected_value: string | number;
}
