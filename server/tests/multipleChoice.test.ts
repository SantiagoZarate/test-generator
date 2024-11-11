import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '../src/types/appRoutes.types';
import { request } from './jest.setup';

describe('MULTIPLE CHOICE', () => {
  const URL: AppRoute = '/api/multiple-choice-test';

  describe('GET /api/multiple-choice', () => {
    it('Should return a 200 response with a list of multiple choice tests', async () => {
      await request
        .get(URL)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body.data)).toBe(true);
        });
    });
  });
});
