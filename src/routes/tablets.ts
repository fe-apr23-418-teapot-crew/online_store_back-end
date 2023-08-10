'use strict';

import express from 'express';
import { devicesController } from '../controllers/ProductsDevice.controller';
import { ProductCategories } from '../types/enums/ProductCategories';
import { catchError } from '../utils/catchError';

const router = express.Router();

router.get(
  '/',
  catchError(devicesController.getAllDevices(ProductCategories.TABLETS)),
);
router.get('/:deviceId', catchError(devicesController.getOneDevice));

export default router;
