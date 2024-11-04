import { StatusCodes } from 'http-status-codes';
import { MOCK_TESTS } from '../drizzle/seed/test.mock';
import { request } from './jest.setup';

describe('REGULAR TEST', () => {
  const URL = '/api/test';
  describe('GET /api/test', () => {
    it('should return a 200 and a list of tests', async () => {
      await request
        .get(URL)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body.data)).toBe(true);
          expect(body.data.length).toBe(MOCK_TESTS.length);
        });
    });
  });
});
