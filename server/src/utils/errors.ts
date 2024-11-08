import statusCodes from 'http-status-codes';

export class ApiError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, statusCodes.NOT_FOUND);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, statusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, statusCodes.UNAUTHORIZED);
  }
}
