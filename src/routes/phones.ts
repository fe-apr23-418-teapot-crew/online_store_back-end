'use strict';

import express from 'express';
import { devicesController } from '../controllers/ProductsDevice.controller';
import { ProductCategories } from '../types/enums/ProductCategories';

const router = express.Router();

router.get('/', devicesController.getAllDevices(ProductCategories.PHONES));
router.get('/:deviceId', devicesController.getOneDevice);

export default router;
