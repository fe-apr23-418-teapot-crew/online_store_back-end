'use strict';
import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../services/jwt.service';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.sendStatus(401);

    return;
  }

  const [, accessToken] = authHeader.split(' ');

  if (!accessToken) {
    res.sendStatus(401);

    return;
  }

  const userData = jwtService.validateAccessToken(accessToken);

  if (!userData) {
    res.sendStatus(401);

    return;
  }

  next();
};
