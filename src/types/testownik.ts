interface OrderableWithImage {
  order?: number;
  image_url?: string;
}

interface TestownikAnswer extends OrderableWithImage {
  text: string;
  is_correct: boolean;
}

export interface TestownikQuestion extends OrderableWithImage {
  text: string;
  answers: TestownikAnswer[];
  multiple?: boolean; // default: false
  explanation?: string | null;
}

export interface TestownikQuiz {
  title: string;
  description?: string;
  questions: TestownikQuestion[];
}
