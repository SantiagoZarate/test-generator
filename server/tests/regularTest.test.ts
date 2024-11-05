import { StatusCodes } from 'http-status-codes';
import { db } from '../drizzle/connection';
import { seed } from '../drizzle/seed';
import { TestSchemaValidation } from '../src/lib/zod-schemas/test.validation';
import { DEFAULT_LIMIT } from '../src/utils/getPaginatedParams';
import { request } from './jest.setup';

describe('REGULAR TEST', () => {
  const URL = '/api/test';

  beforeEach(async () => {
    await seed();
  });

  describe('GET /api/test', () => {
    it('should return a 200 and a list of tests', async () => {
      await request
        .get(URL)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(Array.isArray(body.data)).toBe(true);
          expect(body.data.length).toBe(DEFAULT_LIMIT);
        });
    });
  });

  describe('GET /api/test/:id', () => {
    it('should return a 200 response when looking for a test by id', async () => {
      const test = await db.query.testSchema.findFirst();

      await request
        .get(URL + '/' + test?.id)
        .expect(StatusCodes.OK)
        .expect(({ body }) => {
          expect(body.ok).toBe(true);
          expect('id' in body.data).toBe(true);
        });
    });

    it('should return a 404 response when looking for an invalid test id', async () => {
      const invalidID = 'invalid-id';

      await request.get(URL + '/' + invalidID).expect(StatusCodes.NOT_FOUND);
    });
  });

  describe('POST /api/test', () => {
    it('should return a 201 response when creating a test', async () => {
      const payload: TestSchemaValidation = {
        title: 'new test',
        questions: ['question 1'],
      };

      await request.post(URL).send(payload).expect(StatusCodes.CREATED);
    });

    it('should return a 400 response when creating a test with empty title', async () => {
      const invalidPayload: TestSchemaValidation = {
        title: '',
        questions: ['question'],
      };

      await request
        .post(URL)
        .send(invalidPayload)
        .expect(StatusCodes.BAD_REQUEST);
    });

    it('should return a 400 response when creating a test with empty questions array', async () => {
      const invalidPayload: TestSchemaValidation = {
        title: 'new test',
        questions: [],
      };

      await request
        .post(URL)
        .send(invalidPayload)
        .expect(StatusCodes.BAD_REQUEST);
    });

    it('should return a 400 response when creating a test with exceding amount of questions', async () => {
      const invalidPayload: TestSchemaValidation = {
        title: 'new test',
        questions: Array(11).fill('question'),
      };

      await request
        .post(URL)
        .send(invalidPayload)
        .expect(StatusCodes.BAD_REQUEST);
    });
  });

  describe('DELETE /api/test', () => {
    it('should return a 204 response when deleting a test', async () => {
      const test = await db.query.testSchema.findFirst();

      await request.delete(URL + '/' + test?.id).expect(StatusCodes.NO_CONTENT);
    });

    it('should return a 404 response when deleting an invalid test', async () => {
      const invalidID = 'invalid-id';

      await request.delete(URL + '/' + invalidID).expect(StatusCodes.NOT_FOUND);
    });
  });
});
