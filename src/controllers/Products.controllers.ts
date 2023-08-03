'use strict';

import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { ProductCategories } from '../types/enums/ProductCategories';
import { SortByOptions } from '../types/enums/Sorting';

const getAllProducts = async (req: Request, res: Response) => {
  const productsService = new ProductsService();

  const count = await productsService.count();

  const {
    limit = count,
    offset = 0,
    sortBy = SortByOptions.ID,
    productType,
  } = req.query;

  const isSortByValid = Object.values(SortByOptions).includes(
    sortBy as SortByOptions,
  );
  const isLimitValid = !Number.isNaN(Number(limit));
  const isOffsetValid = !Number.isNaN(Number(offset));
  const isProductCategoryValid = Object.values(ProductCategories).includes(
    productType as ProductCategories,
  );

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    res.sendStatus(400);

    return;
  }

  let where: { category?: ProductCategories } = {};

  if (productType) {
    if (isProductCategoryValid) {
      where = { category: productType as ProductCategories };
    } else {
      res.json([]);

      return;
    }
  }

  const results = await productsService.findAndCountAll({
    limit: Number(limit),
    offset: Number(offset),
    sortBy: sortBy as SortByOptions,
    where,
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
      category: foundProduct.category as ProductCategories,
    },
    sortBy: SortByOptions.RANDOM,
  });

  res.json(results);
};

const newProducts = async (req: Request, res: Response) => {
  const productsService = new ProductsService();

  const results = await productsService.findAndCountAll({
    where: {
      category: ProductCategories.PHONES,
    },
    sortBy: SortByOptions.NEW,
    limit: 15,
  });

  res.json(results);
};

const discountProducts = async (req: Request, res: Response) => {
  const productsService = new ProductsService();

  const results = await productsService.findAndCountAll({
    where: {
      category: ProductCategories.PHONES,
    },
    sortBy: SortByOptions.DISCOUNT,
    limit: 15,
  });

  res.json(results);
};

export const productsController = {
  getAllProducts,
  getOneProduct,
  recommendedProducts,
  newProducts,
  discountProducts,
};
