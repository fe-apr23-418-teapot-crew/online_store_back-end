'use strict';

import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { availableSortBy } from '../utils/constants';

const getAllProducts = async (req: Request, res: Response) => {
  const productsService = new ProductsService();

  const count = await productsService.count();

  const { limit = count, offset = 0, sortBy = 'id' } = req.query;

  const isSortByValid =
    typeof sortBy === 'string' && availableSortBy.includes(sortBy);
  const isLimitValid = !Number.isNaN(Number(limit));
  const isOffsetValid = !Number.isNaN(Number(offset));

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    res.sendStatus(400);

    return;
  }

  const results = await productsService.findAndCountAll({
    limit: Number(limit),
    offset: Number(offset),
    sortBy,
  });

  res.json(results);
};

const getOneProduct = async (req: Request, res: Response) => {
  const productsService = new ProductsService();

  const { productId } = req.params;

  if (isNaN(Number(productId))) {
    res.sendStatus(400);

    return;
  }

  const foundProduct = await productsService.findById(+productId);

  if (!foundProduct) {
    res.sendStatus(404);

    return;
  }

  res.json(foundProduct);
};

const recommendedProducts = async (req: Request, res: Response) => {
  const productsService = new ProductsService();

  const { productId } = req.params;

  if (isNaN(Number(productId))) {
    res.sendStatus(400);

    return;
  }

  const foundProduct = await productsService.findById(+productId);

  if (!foundProduct) {
    res.sendStatus(404);

    return;
  }

  const results = await productsService.findAndCountAll({
    where: {
      category: foundProduct.category,
    },
    sortBy: 'RANDOM',
  });

  res.json(results);
};

export const productsController = {
  getAllProducts,
  getOneProduct,
  recommendedProducts,
};
