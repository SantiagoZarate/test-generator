import { TestRepository } from '../repositories/test.repository';
import { TestInsert, TestSelect } from '../types/test.types';

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
};
