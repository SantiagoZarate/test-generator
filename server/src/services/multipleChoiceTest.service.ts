import { multipleChoiceQuestionRepository } from '../repositories/multipleChoiceQuestion.repository';
import { multipleChoiceTestRepository } from '../repositories/multipleChoiceTest.repository';
import { MCTestSelect } from '../types/multipleChoiceTest.types';
import { BadRequestError } from '../utils/errors';
import { PaginateConfig } from '../utils/getPaginatedParams';

class MultipleChoiceTestService {
  private readonly repository = multipleChoiceTestRepository;

  async getAll(config: PaginateConfig) {
    const totalTests = await this.repository.getCount();

    if (totalTests === 0) {
      return { testsWithMoreInfo: [], totalPages: 0, totalTests: 0 };
    }

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

  async getOneWithInfo({ id }: MCTestSelect) {
    const test = await this.repository.getOneWithInfo({ id });
    const questionsCount =
      await multipleChoiceQuestionRepository.getQuestionCountByTest({ id });

    const aprovedTests = test.results.filter(
      (r) => r.right_answers >= test.right_answers_to_pass,
    );

    const totalScore = test.results.reduce(
      (acc, curr) => acc + curr.right_answers,
      0,
    );

    const averageScore = parseFloat(
      (totalScore / test.results.length).toFixed(1),
    );
    const countAprovedTests = aprovedTests.length;
    const countDisaprovedTests = test.results.length - countAprovedTests;

    return {
      ...test,
      info: {
        averageScore,
        countAprovedTests,
        countDisaprovedTests,
        questionsCount,
      },
    };
  }
}

export const multipleChoiceTestService = new MultipleChoiceTestService();
