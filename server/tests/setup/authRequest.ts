import { verify } from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../src/app';
import { UserData } from '../../src/types/authRequest';

// Mock the entire jsonwebtoken module
jest.mock('jsonwebtoken');

// Helper function to generate requests with a mock token
export function authRequest(userId = 'default-user-id') {
  // Change jsonwebtoken.verify behavior to return a dynamic user ID
  (verify as jest.Mock).mockImplementation(
    () =>
      ({
        id: userId,
      }) as UserData,
  );

  const agent = supertest.agent(app);
  return agent.set('Cookie', ['accessToken=mockedAccessToken']);
}
