'use strict';

import { Request, Response } from 'express';
import { Products } from '../models/products.model';
import { ProductData } from '../types/Products';

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

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Products.findAll();

  res.json(products.map(normalize));
};

const getOneProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (isNaN(Number(productId))) {
    res.sendStatus(400);

    return;
  }

  const foundProduct = await Products.findByPk(productId);

  if (!foundProduct) {
    res.sendStatus(404);

    return;
  }

  res.json(normalize(foundProduct));
};

const getProductsByPage = async (req: Request, res: Response) => {
  const { page, limit } = req.params;

  const parsedLimit = parseInt(limit, 10);
  const parsedPage = parseInt(page, 10);

  if (isNaN(parsedPage) || parsedPage <= 0) {
    res
      .status(400)
      .json({ error: 'Invalid page value. Please provide a positive number.' });

    return;
  }

  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    res
      .status(400)
      .json({
        error: 'Invalid limit value. Please provide a positive number.',
      });

    return;
  }

  const offset = (parsedPage - 1) * parsedLimit;

  const products = await Products.findAll({
    limit: parsedLimit,
    offset,
  });

  res.json(products.map(normalize));
};

export const productsController = {
  getAllProducts,
  getOneProduct,
  getProductsByPage,
};
