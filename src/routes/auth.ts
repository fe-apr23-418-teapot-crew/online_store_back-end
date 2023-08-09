'use strict';

import express from 'express';
import { authController } from '../controllers/Auth.controller';

const router = express.Router();

router.post('/registration', authController.register);
router.get('/activation/:activationToken', authController.activate);

export default router;
