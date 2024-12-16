import { create } from 'zustand';

type Option = {
  content: string;
  isCorrect: boolean;
};

interface MultipleChoice {
  content: string;
  options: Option[];
}

interface State {
  questions: MultipleChoice[];
  newQuestionValue: string;
  testTitle: string;
  options: Option[];
  rightAnswersToPass: number;
}

interface Action {
  toggleOptionCorrect: (optionIndex: number) => void;
  updateNewQuestion: (value: string) => void;
  updateTitle: (value: string) => void;
  deleteOption: (index: number) => void;
  addQuestion: () => void;
  addOption: () => void;
  updateOptionValue: (optionIndex: number, value: string) => void;
  deleteQuestion: (questionIndex: number) => void;
  resetQuestions: () => void;
  increaseRightAnswersToPass: () => void;
  decreaseRightAnswersToPass: () => void;
}

const useMultipleChoiceTestStore = create<State & Action>((set) => ({
  correctAnswer: 0,
  options: [],
  newQuestionValue: '',
  questions: [],
  testTitle: '',
  rightAnswersToPass: 0,
  addOption() {
    set((prevState) => {
      const isFirstOption = prevState.options.length === 0;

      return {
        ...prevState,
        options: [
          ...prevState.options,
          { content: '', isCorrect: isFirstOption },
        ],
      };
    });
  },
  toggleOptionCorrect(optionIndex) {
    set((prevState) => {
      const updatedOptions = [...prevState.options];
      // Toggle the option isCorrect property
      updatedOptions[optionIndex]!.isCorrect =
        !updatedOptions[optionIndex]!.isCorrect;
      return { ...prevState, options: updatedOptions };
    });
  },
  updateTitle(newValue) {
    set((prevState) => ({ ...prevState, testTitle: newValue }));
  },
  decreaseRightAnswersToPass() {
    set((prevState) => {
      if (prevState.rightAnswersToPass === 0) {
        return prevState;
      }
      return {
        ...prevState,
        rightAnswersToPass: prevState.rightAnswersToPass - 1,
      };
    });
  },
  increaseRightAnswersToPass() {
    set((prevState) => {
      if (prevState.rightAnswersToPass === prevState.questions.length) {
        return prevState;
      }
      return {
        ...prevState,
        rightAnswersToPass: prevState.rightAnswersToPass + 1,
      };
    });
  },
  deleteOption(index) {
    set((prevState) => {
      const firstHalf = prevState.options.slice(0, index);
      const secondHalf = prevState.options.slice(index + 1);

      return {
        ...prevState,
        options: [...firstHalf, ...secondHalf],
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
          content: prevState.newQuestionValue,
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
      newOptions[optionIndex]!.content = value;
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
