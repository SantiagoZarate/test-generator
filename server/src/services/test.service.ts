import { TestRepository } from '../repositories/test.repository';
import { TestInsert, TestSelect } from '../types/test.types';
import { NotFoundError } from '../utils/errors';

const testRepository = new TestRepository();

export const testService = {
  async getAll() {
    const tests = await testRepository.getAll();
    return tests;
  },
  async getOne({ id }: TestSelect) {
    const test = await testRepository.getById({ id });
    return test;
  },
  async create(data: TestInsert) {
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
