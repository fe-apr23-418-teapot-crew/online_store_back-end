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

export const productsController = {
  getAllProducts,
  getOneProduct,
};
