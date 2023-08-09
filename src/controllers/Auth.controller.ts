'use strict';

import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/email.service';

const register = async (req: Request, res: Response) => {
  try {
    const userService = new UsersService();
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Both email and password are required' });

      return;
    }
    const activationToken = uuidv4();
    const user = await userService.create({ email, password, activationToken });

    await emailService.sendActivationLink(email, activationToken);

    res.json(user);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const usersService = new UsersService();
    const { activationToken } = req.params;

    const user = await usersService.findOne(activationToken);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    user.activationToken = null;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

export const authController = {
  register,
  activate,
};
