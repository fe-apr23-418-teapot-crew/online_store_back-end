'use strict';

import { Request, Response } from 'express';
import { userService } from '../services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/email.service';
import { jwtService } from '../services/jwt.service';
import { normalize } from './Users.controller';
import { ApiError } from '../exceptions/ApiError';
import { ALL_ERROR_MESSAGES, ERROR_CODES } from '../utils/errorMessages';

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await userService.getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest(ALL_ERROR_MESSAGES.EXISTING_EMAIL, {
      email: ERROR_CODES.EXISTING_EMAIL,
    });
  }

  const activationToken = uuidv4();
  const user = await userService.create({ email, password, activationToken });

  await emailService.sendActivationLink(email, activationToken);

  res.json(normalize(user));
};

const activate = async (req: Request, res: Response) => {
  const { activationToken } = req.params;

  const user = await userService.findOneByToken(activationToken);

  if (!user) {
    throw ApiError.NotFound();
  }

  user.activationToken = null;

  await user.save();

  res.json(normalize(user));
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.getByEmail(email);

  if (!user || password !== user.password) {
    throw ApiError.Unauthorized();
  }

  const userData = normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);

  res.json({
    user: userData,
    accessToken,
  });
};

export const authController = {
  register,
  activate,
  login,
};
