'use strict';

import { Request, Response } from 'express';
import { ProductData } from '../types/Products';
import { ProductsService } from '../services/products.service';

const normalize = ({
  id,
  category,
  itemId,
  name,
  fullPrice,
  price,
  screen,
  capacity,
  color,
  ram,
  year,
  image,
}: ProductData): ProductData => {
  return {
    id,
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    color,
    ram,
    year,
    image,
  };
};

const availableSortBy = ['id', 'price', 'year'];

const getAllProducts = async (req: Request, res: Response) => {
  const productsService = new ProductsService();

  const { limit = 10, offset = 0, sortBy = 'id' } = req.query;

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

  res.json(normalize(foundProduct));
};

export const productsController = {
  getAllProducts,
  getOneProduct,
};
