'use strict';

import { Request, Response } from 'express';
import { userService } from '../services/users.service';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { emailService } from '../services/email.service';
import { jwtService } from '../services/jwt.service';
import { normalize } from './Users.controller';
import { ApiError } from '../exceptions/ApiError';
import { ALL_ERROR_MESSAGES, ERROR_CODES } from '../utils/errorMessages';
import { UserData } from '../types/User';

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await userService.getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest(ALL_ERROR_MESSAGES.EXISTING_EMAIL, {
      email: ERROR_CODES.EXISTING_EMAIL,
    });
  }

  const activationToken = uuidv4();
  const hash = await bcrypt.hash(password, 10);

  const user = await userService.create({
    email,
    password: hash,
    activationToken,
  });

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

  if (!user) {
    throw ApiError.Unauthorized();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.BadRequest(ALL_ERROR_MESSAGES.INVALID_PASSWORD, {
      password: ERROR_CODES.INVALID_PASSWORD,
    });
  }

  sendAuthentication(res, user);
};

const refresh = async (req: Request, res: Response) => {
  const { refreshAccessToken } = req.cookies;

  const userData = jwtService.validateRefreshAccessToken(refreshAccessToken);

  if (!userData || typeof userData !== 'object') {
    throw ApiError.Unauthorized();
  }

  const user = await userService.getByEmail(userData.user.email);

  if (!user) {
    throw ApiError.Unauthorized();
  }

  sendAuthentication(res, user);
};

const sendAuthentication = (res: Response, user: UserData) => {
  const userData = normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);
  const refreshAccessToken = jwtService.generateRefreshAccessToken(userData);

  res.cookie('refreshAccessToken', refreshAccessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.json({
    user: userData,
    accessToken,
  });
};

export const authController = {
  register,
  activate,
  login,
  refresh,
};
