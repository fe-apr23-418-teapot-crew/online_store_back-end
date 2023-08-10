'use strict';

import { Request, Response } from 'express';
import { productsService } from '../services/products.service';
import { ProductCategories } from '../types/enums/ProductCategories';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { FindAllOptions } from '../types/findAllOptions';
import { Op } from 'sequelize';
import { ApiError } from '../exceptions/ApiError';
import { ALL_ERROR_MESSAGES, ERROR_CODES } from '../utils/errorMessages';

const getAllProducts = async (req: Request, res: Response) => {
  const count = await productsService.count();

  const {
    limit = count,
    offset = 0,
    sortBy = SortByOptions.ID,
    productType,
    name,
  } = req.query;

  const { isSortByValid, isLimitValid, isOffsetValid, isProductCategoryValid } =
    validateQueryParameters(
      +limit,
      +offset,
      sortBy as SortByOptions,
      productType as ProductCategories,
    );

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    throw ApiError.BadRequest(ALL_ERROR_MESSAGES.INVALID_SORTING, {
      sortBy: isSortByValid ? undefined : ERROR_CODES.INVALID_SORT,
      limit: isLimitValid ? undefined : ERROR_CODES.INVALID_LIMIT,
      offset: isOffsetValid ? undefined : ERROR_CODES.INVALID_OFFSET,
    });
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
};

const getOneProductById = async (req: Request, res: Response) => {
  const { idOrItemId } = req.params;

  if (!idOrItemId) {
    throw ApiError.BadRequest(ALL_ERROR_MESSAGES.INVALID_ID_OR_ITEM_ID, {
      idOrItemId: ERROR_CODES.INVALID_ID_OR_ITEM_ID,
    });
  }

  let foundProduct;

  if (!isNaN(Number(idOrItemId))) {
    foundProduct = await productsService.findById(+idOrItemId);
  } else {
    foundProduct = await productsService.findByItemId(idOrItemId);
  }

  if (!foundProduct) {
    throw ApiError.NotFound();
  }

  res.json(foundProduct);
};

const recommendedProducts = async (req: Request, res: Response) => {
  const { productId } = req.params;

  if (isNaN(Number(productId))) {
    throw ApiError.BadRequest(ALL_ERROR_MESSAGES.INVALID_ID, {
      productId: ERROR_CODES.INVALID_ID,
    });
  }

  const foundProduct = await productsService.findById(+productId);

  if (!foundProduct) {
    throw ApiError.NotFound();
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
  getOneProductById,
  recommendedProducts,
  newProducts,
  discountProducts,
};
