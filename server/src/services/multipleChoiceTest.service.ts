import { multipleChoiceQuestionRepository } from '../repositories/multipleChoiceQuestion.repository';
import { multipleChoiceTestRepository } from '../repositories/multipleChoiceTest.repository';
import { BadRequestError } from '../utils/errors';
import { PaginateConfig } from '../utils/getPaginatedParams';

class MultipleChoiceTestService {
  private readonly repository = multipleChoiceTestRepository;

  async getAll(config: PaginateConfig) {
    const totalTests = await this.repository.getCount();

    const totalPages = Math.ceil(totalTests / config.limit);

    if (config.page < 0 || config.page > totalPages) {
      throw new BadRequestError('Page out of index');
    }

    const tests = await this.repository.getAll(config);

    const testsWithMoreInfo = await Promise.all(
      tests.map(async (test) => ({
        ...test,
        questionsCounts:
          await multipleChoiceQuestionRepository.getQuestionCountByTest({
            id: test.id,
          }),
      })),
    );

    return { testsWithMoreInfo, totalPages, totalTests };
  }
}

export const multipleChoiceTestService = new MultipleChoiceTestService();
