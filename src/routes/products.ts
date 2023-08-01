'use strict';

import express from 'express';
import { productsController } from '../controllers/Products.controllers';

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:productId', productsController.getOneProduct);

router.get(
  '/page/currentPage=:page/perPage=:limit',
  productsController.getProductsByPage,
);

export default router;
