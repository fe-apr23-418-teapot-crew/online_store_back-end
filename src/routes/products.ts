'use strict';

import express from 'express';
import { productsController } from '../controllers/Products.controllers';
import { catchError } from '../utils/catchError';

const router = express.Router();

router.get('/', catchError(productsController.getAllProducts));
router.get('/new', catchError(productsController.newProducts));
router.get('/discount', catchError(productsController.discountProducts));
router.get('/:idOrItemId', catchError(productsController.getOneProductById));
router.get(
  '/:productId/recommended',
  catchError(productsController.recommendedProducts),
);

export default router;
