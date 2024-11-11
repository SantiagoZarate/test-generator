import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app);

jest.mock('jsonwebtoken');

beforeEach(() => {
  // Reset all mocks before each test
  jest.resetAllMocks();
});

export { request };
