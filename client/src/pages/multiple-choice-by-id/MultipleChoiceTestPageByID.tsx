import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti-explosion';
import { useParams } from 'react-router-dom';

export function MultipleChoiceTestPageByID() {
  const { id } = useParams();
  const [chosenAnswers, setChosenAnswers] = useState<number[][]>([]); // Store multiple selected answers per question
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showQuestionAnswer, setShowQuestionAnswer] = useState<boolean[]>([]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['multiple-choice-test'],
    queryFn: () => multipleChoiceTestAPI.getOne(id!),
  });

  // Initialize state when data is loaded
  useEffect(() => {
    if (data?.questions) {
      setShowQuestionAnswer(Array(data.questions.length).fill(false));
      setChosenAnswers(Array(data.questions.length).fill([]));
    }
  }, [data]);

  const handleToggleAnswer = (questionIndex: number, optionIndex: number) => {
    setChosenAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const currentAnswers = updatedAnswers[questionIndex] || [];

      // Toggle the selection of the option
      if (currentAnswers.includes(optionIndex)) {
        updatedAnswers[questionIndex] = currentAnswers.filter(
          (index) => index !== optionIndex
        );
      } else {
        updatedAnswers[questionIndex] = [...currentAnswers, optionIndex];
      }

      return updatedAnswers;
    });
  };

  const handleResetTest = () => {
    setShowResults(false);
    setChosenAnswers(Array(data?.questions.length).fill([]));
    setShowQuestionAnswer(Array(data?.questions.length).fill(false));
  };

  const calculateTotalScore = () => {
    return data?.questions.reduce((score, _question, questionIndex) => {
      const correctAnswers = getCorrectAnswers(questionIndex);
      const selectedAnswers = chosenAnswers[questionIndex] || [];

      // Check if all selected answers are correct and no extra answers are selected
      const isCorrect =
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((answer) => correctAnswers.includes(answer));

      return isCorrect ? score + 1 : score;
    }, 0);
  };

  const getCorrectAnswers = (questionIndex: number) => {
    return (
      data?.questions[questionIndex]?.options
        .map((opt, index) => (opt.isCorrect ? index : -1))
        .filter((index) => index !== -1) || []
    );
  };

  const handleSubmitResult = () => {
    setShowResults(true);
    multipleChoiceTestAPI
      .postResult(id!, {
        right_answers: calculateTotalScore()!,
      })
      .then(() => {
        toast({
          title: 'Test result sent successfully',
          description: 'Thanks for submitting your results!',
        });
      });
  };

  const isQuestionCorrect = (questionIndex: number) => {
    const correctAnswers = getCorrectAnswers(questionIndex);
    const selectedAnswers = chosenAnswers[questionIndex] || [];

    return (
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer))
    );
  };

  return (
    <section className="flex flex-col gap-12">
      <header>
        <h1 className="text-2xl font-bold capitalize">{data?.title}</h1>
        <p>Rigth answers to pass: {data?.right_answers_to_pass}</p>
      </header>
      <section className="flex flex-col gap-8">
        {data?.questions.map((question, index) => (
          <article className="flex flex-col gap-4" key={question.id}>
            <div>
              <p className="text-lg font-semibold">
                {index + 1} - {question.content}
              </p>
              {showResults && !isQuestionCorrect(index) && (
                <button
                  className="rounded-md bg-foreground px-3 text-background transition hover:bg-muted"
                  onClick={() =>
                    setShowQuestionAnswer((prevState) => {
                      const updated = [...prevState];
                      updated[index] = !updated[index];
                      return updated;
                    })
                  }
                >
                  Show correct answers
                </button>
              )}
            </div>
            <ul className="flex flex-col">
              {question.options.map((option, optionIndex) => {
                let optionClass =
                  'cursor-pointer p-2 transition hover:bg-border';

                if (showResults) {
                  const selectedAnswers = chosenAnswers[index] || [];
                  const correctAnswers = getCorrectAnswers(index);

                  if (selectedAnswers.includes(optionIndex)) {
                    if (correctAnswers.includes(optionIndex)) {
                      // Blue if only one correct answer is selected and there are multiple correct answers
                      if (
                        correctAnswers.length > 1 &&
                        selectedAnswers.length === 1
                      ) {
                        optionClass += ' bg-blue-500';
                      } else {
                        // Green for the correct answer
                        optionClass += ' bg-green-500';
                      }
                    } else {
                      // Red for incorrect answers
                      optionClass += ' bg-red-500';
                    }
                  }

                  // Highlight correct answers in yellow when showQuestionAnswer is true
                  if (showQuestionAnswer[index] && option.isCorrect) {
                    optionClass += ' bg-yellow-500';
                  }
                }

                return (
                  <label
                    key={option.order}
                    htmlFor={`${index}-option-${option.order}`}
                    className={'flex items-center gap-2 ' + optionClass}
                  >
                    <input
                      disabled={showResults}
                      checked={
                        chosenAnswers[index]?.includes(optionIndex) || false
                      }
                      onChange={() => handleToggleAnswer(index, optionIndex)}
                      id={`${index}-option-${option.order}`}
                      name={`question-${index}-${option.order}`}
                      type="checkbox" // Change to checkbox for multiple answers
                    />
                    {option.content}
                  </label>
                );
              })}
            </ul>
          </article>
        ))}
        <footer className="flex flex-col gap-2">
          <Button
            disabled={
              chosenAnswers.some((answers) => answers.length === 0) ||
              showResults
            }
            onClick={handleSubmitResult}
          >
            {showResults &&
              calculateTotalScore()! >= data!.right_answers_to_pass && (
                <Confetti />
              )}
            Finish
          </Button>
          <Button onClick={handleResetTest} disabled={!showResults}>
            Reset
          </Button>
        </footer>
        {showResults && (
          <p>
            Score: {calculateTotalScore()}/{data?.questions.length}
          </p>
        )}
      </section>
      {isError && <div>There was an error...</div>}
      {isLoading && <div>Loading...</div>}
    </section>
  );
}
