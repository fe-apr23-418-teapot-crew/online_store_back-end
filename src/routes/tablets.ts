'use strict';

import express from 'express';
import { tabletsController } from '../controllers/Tablets.controller';

const router = express.Router();

router.get('/', tabletsController.getAllTablets);

router.get('/:tabletId', tabletsController.getOneTablet);

export default router;
