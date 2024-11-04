import { multipleChoiceQuestionRepository } from '../repositories/multipleChoiceQuestion.repository';
import { multipleChoiceTestRepository } from '../repositories/multipleChoiceTest.repository';

class MultipleChoiceTestService {
  private readonly repository = multipleChoiceTestRepository;

  async getAll() {
    const tests = await this.repository.getAll();

    const testsWithMoreInfo = await Promise.all(
      tests.map(async (test) => ({
        ...test,
        questionsCounts:
          await multipleChoiceQuestionRepository.getQuestionCountByTest({
            id: test.id,
          }),
      })),
    );

    return testsWithMoreInfo;
  }
}

export const multipleChoiceTestService = new MultipleChoiceTestService();
