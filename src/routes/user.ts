'use strict';

import express from 'express';
import { usersController } from '../controllers/Users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { catchError } from '../utils/catchError';

const router = express.Router();

router.get('/', authMiddleware, catchError(usersController.getAll));

export default router;
