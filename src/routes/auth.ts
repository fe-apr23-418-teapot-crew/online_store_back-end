'use strict';

import express from 'express';
import { authController } from '../controllers/Auth.controller';
import { catchError } from '../utils/catchError';

const router = express.Router();

router.post('/registration', catchError(authController.register));
router.get('/activation/:activationToken', catchError(authController.activate));
router.post('/login', catchError(authController.login));

export default router;
