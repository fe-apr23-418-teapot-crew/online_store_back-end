'use strict';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NormalizeUser } from '../types/User';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const generateAccessToken = (user: NormalizeUser) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '30m',
  });
};

const generateRefreshAccessToken = (user: NormalizeUser) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '30d',
  });
};

const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
  } catch (error) {
    return null;
  }
};

const validateRefreshAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
  } catch (error) {
    return null;
  }
};

export const jwtService = {
  generateAccessToken,
  generateRefreshAccessToken,
  validateAccessToken,
  validateRefreshAccessToken,
};
