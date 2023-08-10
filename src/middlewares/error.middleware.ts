'use strict';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { ERROR_CODES } from '../utils/errorMessages';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    res.status(status).json({
      message,
      errors,
    });
  } else {
    res.status(500).json({
      message: ERROR_CODES.SERVER_ERROR,
    });
  }
};
