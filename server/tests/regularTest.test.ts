import { eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { db } from '../drizzle/connection';
import { seed } from '../drizzle/seed';
import { MOCK_USER } from '../drizzle/seed/user.mock';
import { TestSchemaValidation } from '../src/lib/zod-schemas/test.validation';
import { DEFAULT_LIMIT } from '../src/utils/getPaginatedParams';
import { request } from './jest.setup';
import { authRequest } from './setup/authRequest';

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
    let userId: string | undefined;

    // Use beforeEach to perform asynchronous setup
    beforeEach(async () => {
      const email = MOCK_USER.email;
      const user = await db.query.userSchema.findFirst({
        where: (user) => eq(user.email, email),
      });
      userId = user?.id;
    });

    it('should return a 201 response when creating a test', async () => {
      const payload: TestSchemaValidation = {
        title: 'new test',
        questions: ['question 1'],
      };

      await authRequest(userId)
        .post(URL)
        .send(payload)
        .expect(StatusCodes.CREATED);
    });

    it('should return a 400 response when creating a test with empty title', async () => {
      const invalidPayload: TestSchemaValidation = {
        title: '',
        questions: ['question'],
      };

      await authRequest(userId)
        .post(URL)
        .send(invalidPayload)
        .expect(StatusCodes.BAD_REQUEST);
    });

    it('should return a 400 response when creating a test with empty questions array', async () => {
      const invalidPayload: TestSchemaValidation = {
        title: 'new test',
        questions: [],
      };

      await authRequest(userId)
        .post(URL)
        .send(invalidPayload)
        .expect(StatusCodes.BAD_REQUEST);
    });

    it('should return a 400 response when creating a test with exceding amount of questions', async () => {
      const invalidPayload: TestSchemaValidation = {
        title: 'new test',
        questions: Array(11).fill('question'),
      };

      await authRequest(userId)
        .post(URL)
        .send(invalidPayload)
        .expect(StatusCodes.BAD_REQUEST);
    });
  });

  describe('DELETE /api/test', () => {
    let userId: string | undefined;

    // Use beforeEach to perform asynchronous setup
    beforeEach(async () => {
      const email = MOCK_USER.email;
      const user = await db.query.userSchema.findFirst({
        where: (user) => eq(user.email, email),
      });
      userId = user?.id;
    });

    it('should return a 204 response when deleting a test', async () => {
      const test = await db.query.testSchema.findFirst();

      await authRequest(userId)
        .delete(URL + '/' + test?.id)
        .expect(StatusCodes.NO_CONTENT);
    });

    it('should return a 404 response when deleting an invalid test', async () => {
      const invalidID = 'invalid-id';

      await authRequest(userId)
        .delete(URL + '/' + invalidID)
        .expect(StatusCodes.NOT_FOUND);
    });
  });
});
