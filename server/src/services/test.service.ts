import { TestRepository } from '../repositories/test.repository';
import { TestInsert, TestSelect } from '../types/test.types';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { PaginateConfig } from '../utils/getPaginatedParams';

const testRepository = new TestRepository();

export const testService = {
  async getAll(config: PaginateConfig) {
    const totalTests = await testRepository.getCount();

    if (totalTests === 0) {
      return { testsWithMoreInfo: [], totalPages: 0, totalTests: 0 };
    }

    const totalPages = Math.ceil(totalTests / config.limit);

    if (config.page < 0 || config.page > totalPages) {
      throw new BadRequestError('Page out of index');
    }

    const tests = await testRepository.getAll(config);
    return { tests, totalPages, totalTests };
  },
  async getOne({ id }: TestSelect) {
    const test = await testRepository.getById({ id });
    return test;
  },
  async create(data: TestInsert) {
    console.log({ data });

    const test = await testRepository.create(data);
    return test;
  },
  async delete({ id }: TestSelect) {
    const deleted = await testRepository.delete({ id });
    if (!deleted) {
      throw new NotFoundError(`Test with id: ${id} not found`);
    }
  },
};
