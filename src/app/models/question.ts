export interface OptionModel {
  text: string;
  correct: boolean;
}

export interface QuestionModel {
  explanation: string;
  options: OptionModel[];
  questionText: string;
}
