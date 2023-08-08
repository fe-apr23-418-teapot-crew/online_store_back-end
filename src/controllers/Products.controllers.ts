'use strict';

import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { ProductCategories } from '../types/enums/ProductCategories';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { FindAllOptions } from '../types/findAllOptions';
import { Op } from 'sequelize';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsService = new ProductsService();

    const count = await productsService.count();

    const {
      limit = count,
      offset = 0,
      sortBy = SortByOptions.ID,
      productType,
      name,
    } = req.query;

    const {
      isSortByValid,
      isLimitValid,
      isOffsetValid,
      isProductCategoryValid,
    } = validateQueryParameters(
      +limit,
      +offset,
      sortBy as SortByOptions,
      productType as ProductCategories,
    );

    if (!isSortByValid || !isLimitValid || !isOffsetValid) {
      res.sendStatus(400);

      return;
    }

    const where: FindAllOptions['where'] = {};

    if (productType) {
      if (isProductCategoryValid) {
        where.category = productType as ProductCategories;
      } else {
        res.json([]);

        return;
      }
    }

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    const results = await productsService.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      sortBy: sortBy as SortByOptions,
      where,
    });

    res.json(results);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

const getOneProduct = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

const recommendedProducts = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

const newProducts = async (req: Request, res: Response) => {
  try {
    const productsService = new ProductsService();

    const results = await productsService.findAndCountAll({
      where: {
        category: ProductCategories.PHONES,
      },
      sortBy: SortByOptions.NEW,
      limit: 15,
    });

    res.json(results);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

const discountProducts = async (req: Request, res: Response) => {
  try {
    const productsService = new ProductsService();

    const results = await productsService.findAndCountAll({
      where: {
        category: ProductCategories.PHONES,
      },
      sortBy: SortByOptions.DISCOUNT,
      limit: 15,
    });

    res.json(results);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

export const productsController = {
  getAllProducts,
  getOneProduct,
  recommendedProducts,
  newProducts,
  discountProducts,
};
