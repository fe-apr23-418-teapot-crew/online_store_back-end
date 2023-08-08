'use strict';

import express from 'express';
import { accessoriesController } from '../controllers/Accessories.controller';

const router = express.Router();

router.get('/', accessoriesController.getAllAccessories);
router.get('/:accessoriesId', accessoriesController.getOneAccessories);

export default router;
