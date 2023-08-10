'use strict';

import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { NormalizeUser } from '../types/User';

export const normalize = ({ id, email }: NormalizeUser) => {
  return {
    id,
    email,
  };
};

const getAll = async (req: Request, res: Response) => {
  const usersService = new UsersService();

  const users = await usersService.getSelectedActive();

  res.json(users.rows.map(normalize));
};

export const usersController = {
  getAll,
};
