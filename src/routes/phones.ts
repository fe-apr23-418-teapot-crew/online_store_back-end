'use strict';

import express from 'express';
import { phonesController } from '../controllers/Phones.controller';

const router = express.Router();

router.get('/', phonesController.getAllPhones);
router.get('/:phoneId', phonesController.getOnePhone);

export default router;
