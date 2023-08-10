'use strict';

import { Request, Response } from 'express';
import { userService } from '../services/users.service';
import { NormalizeUser } from '../types/User';

export const normalize = ({ id, email }: NormalizeUser) => {
  return {
    id,
    email,
  };
};

const getAll = async (req: Request, res: Response) => {
  const users = await userService.getSelectedActive();

  res.json(users.rows.map(normalize));
};

export const usersController = {
  getAll,
};
