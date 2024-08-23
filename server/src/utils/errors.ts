import statusCodes from "http-status-codes";

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
