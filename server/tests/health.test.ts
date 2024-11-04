import { StatusCodes } from 'http-status-codes';
import { request } from './jest.setup';

describe('/health', () => {
  const url = '/health';
  it('should be healthy', async () => {
    await request.get(url).expect(StatusCodes.OK);
  });
});
