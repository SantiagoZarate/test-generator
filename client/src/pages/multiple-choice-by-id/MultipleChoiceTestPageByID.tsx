import { multipleChoiceTestAPI } from '@/api/multipleChoiceTest/multipleChoiceTest.api';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function MultipleChoiceTestPageByID() {
  const { id } = useParams();
  const [chosenAnswer, setChoseAnswer] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showQuestionAnswer, setShowQuestionAnswer] = useState<boolean[]>([]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['multiple-choice-test'],
    queryFn: () => multipleChoiceTestAPI.getOne(id!),
  });

  // Set the array with falses once the data has loaded
  useEffect(() => {
    setShowQuestionAnswer(Array(data?.questions.length).fill(false));
  }, [data]);

  const handleUpdateAnswer = (index: number, value: number) => {
    const newAnswers = [...chosenAnswer];
    newAnswers[index] = value;
    setChoseAnswer(newAnswers);
  };

  const handleResetTest = () => {
    setShowResults(false);
    setChoseAnswer([]);
  };

  const calculateTotalScore = () => {
    return chosenAnswer.reduce((score, answer, index) => {
      const correctAnswerIndex = getIndexOfCorrectAnswer(index);
      return correctAnswerIndex === answer ? score + 1 : score;
    }, 0);
  };

  const getIndexOfCorrectAnswer = (index: number) => {
    return (
      data?.questions[index]?.options.findIndex((opt) => opt.isCorrect) ?? -1
    );
  };

  const handleSubmitResult = () => {
    setShowResults(true);
    multipleChoiceTestAPI
      .postResult(id!, {
        right_answers: calculateTotalScore(),
      })
      .then(() => {
        toast({
          title: 'Test result sent succesfully',
          description: 'Thanks for submit your results!',
        });
      });
  };

  const isQuestionCorrect = (questionIndex: number) => {
    const correctAnswerIndex = getIndexOfCorrectAnswer(questionIndex);
    return chosenAnswer[questionIndex] === correctAnswerIndex;
  };

  return (
    <section className="flex flex-col gap-12">
      <header>
        <h1 className="text-2xl font-bold capitalize">{data?.title}</h1>
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
                  Mostrar respuesta correcta
                </button>
              )}
            </div>
            <ul className="flex flex-col">
              {question.options.map((option, optionIndex) => {
                let optionClass =
                  'cursor-pointer p-2 transition hover:bg-border';
                if (showResults && chosenAnswer[index] !== undefined) {
                  if (chosenAnswer[index] === optionIndex) {
                    optionClass += option.isCorrect
                      ? !showQuestionAnswer[index] && ' bg-green-500'
                      : !showQuestionAnswer[index] && ' bg-red-500';
                  }
                }

                // Highlight the correct answer in yellow when showQuestionAnswer is true
                if (showQuestionAnswer[index] && option.isCorrect) {
                  optionClass += ' bg-yellow-500'; // Add your yellow background class
                }

                return (
                  <label
                    key={option.order}
                    htmlFor={`${index}-option-${option.order}`}
                    className={'flex items-center gap-2 ' + optionClass}
                  >
                    <input
                      disabled={showResults}
                      checked={chosenAnswer[index] === optionIndex}
                      onChange={() => handleUpdateAnswer(index, optionIndex)}
                      id={`${index}-option-${option.order}`}
                      name={`question-${index}`}
                      type="radio"
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
              chosenAnswer.length !== data?.questions.length || showResults
            }
            onClick={handleSubmitResult}
          >
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
      {isLoading && <div>is loading...</div>}
    </section>
  );
}
