'use strict';

import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/email.service';
import { jwtService } from '../services/jwt.service';
import { normalize } from './Users.controller';

const register = async (req: Request, res: Response) => {
  const userService = new UsersService();
  const { email, password } = req.body;

  const activationToken = uuidv4();
  const user = await userService.create({ email, password, activationToken });

  await emailService.sendActivationLink(email, activationToken);

  res.json(user);
};

const activate = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const { activationToken } = req.params;

  const user = await usersService.findOneByToken(activationToken);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user.activationToken = null;

  await user.save();

  res.json(user);
};

const login = async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const { email, password } = req.body;

  const user = await usersService.getByEmail(email);

  if (!user || password !== user.password) {
    res.sendStatus(401);

    return;
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
