/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

export class ApiError extends Error {
  status: number;
  message: string;
  errors: Record<string, any>;

  constructor(
    status: number,
    message: string,
    errors: Record<string, any> = {},
  ) {
    super(message);

    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static BadRequest(message: string, errors?: Record<string, any>): ApiError {
    return new ApiError(400, message, errors);
  }

  static Unauthorized(): ApiError {
    return new ApiError(401, 'User is not authorized');
  }

  static NotFound(): ApiError {
    return new ApiError(404, 'Not found');
  }
}
