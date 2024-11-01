import { create } from 'zustand';

interface MultipleChoice {
  question: string;
  options: string[];
  answer: number;
}

interface State {
  questions: MultipleChoice[];
  newQuestionValue: string;
  correctAnswer: number;
  options: string[];
}

interface Action {
  updateCorrectOption: (newValue: number) => void;
  updateNewQuestion: (value: string) => void;
  deleteOption: (index: number) => void;
  addQuestion: () => void;
  addOption: () => void;
  updateOptionValue: (optionIndex: number, value: string) => void;
  deleteQuestion: (questionIndex: number) => void;
  resetQuestions: () => void;
}

const useMultipleChoiceTestStore = create<State & Action>((set) => ({
  correctAnswer: 0,
  options: [],
  newQuestionValue: '',
  questions: [],
  addOption() {
    set((prevState) => ({ ...prevState, options: [...prevState.options, ''] }));
  },
  updateCorrectOption(newValue) {
    set((prevState) => ({ ...prevState, correctAnswer: newValue }));
  },
  deleteOption(index) {
    set((prevState) => {
      const firstHalf = prevState.options.slice(0, index);
      const secondHalf = prevState.options.slice(index + 1);
      const correct =
        prevState.correctAnswer === index ? 0 : prevState.correctAnswer;

      return {
        ...prevState,
        options: [...firstHalf, ...secondHalf],
        correctAnswer: correct,
      };
    });
  },
  updateNewQuestion(value) {
    set((prevState) => ({
      ...prevState,
      newQuestionValue: value,
    }));
  },
  addQuestion() {
    set((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          answer: prevState.correctAnswer,
          question: prevState.newQuestionValue,
          options: prevState.options,
        },
      ],
      newQuestionValue: '',
      correctAnswer: 0,
      options: [],
    }));
  },
  updateOptionValue(optionIndex, value) {
    set((prevState) => {
      const newOptions = [...prevState.options];
      newOptions[optionIndex] = value;
      return {
        ...prevState,
        options: newOptions,
      };
    });
  },
  deleteQuestion(questionIndex) {
    set((prevState) => {
      const firstHalf = prevState.questions.slice(0, questionIndex);
      const secondHalf = prevState.questions.slice(questionIndex + 1);
      return {
        ...prevState,
        questions: [...firstHalf, ...secondHalf],
      };
    });
  },
  resetQuestions() {
    set((prevState) => ({
      ...prevState,
      questions: [],
    }));
  },
}));

export { useMultipleChoiceTestStore };
