interface QuizPart {
  text: string;
  order?: number;
  image_url?: string;
}

interface TestownikAnswer extends QuizPart {
  is_correct: boolean;
}

export interface TestownikQuestion extends QuizPart {
  answers: TestownikAnswer[];
  multiple?: boolean; // default: false
  explanation?: string | null;
}

export interface TestownikQuiz {
  title: string;
  description?: string;
  questions: TestownikQuestion[];
}
