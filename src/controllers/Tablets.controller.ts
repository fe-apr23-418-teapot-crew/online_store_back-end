'use strict';

import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { ProductCategories } from '../types/enums/ProductCategories';
import { ProductsDeviceService } from '../services/productsDevice.service';

const getAllTablets = async (req: Request, res: Response) => {
  const productsDeviceService = new ProductsDeviceService();
  const productsService = new ProductsService();

  const count = await productsDeviceService.count();

  const { limit = count, offset = 0, sortBy = SortByOptions.ID } = req.query;

  const { isSortByValid, isLimitValid, isOffsetValid } =
    validateQueryParameters(+limit, +offset, sortBy as SortByOptions);

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    res.sendStatus(400);

    return;
  }

  const where = { category: ProductCategories.TABLETS };

  const tablets = await productsService.findAndCountAll({
    limit: Number(limit),
    offset: Number(offset),
    sortBy: sortBy as SortByOptions,
    where,
  });

  res.json({
    count: tablets.count,
    rows: tablets.rows,
  });
};

const getOneTablet = async (req: Request, res: Response) => {
  const productsDeviceService = new ProductsDeviceService();

  const { tabletId } = req.params;

  if (Number(tabletId)) {
    res.sendStatus(400);

    return;
  }

  const foundTablet = await productsDeviceService.findById(tabletId);

  if (!foundTablet) {
    res.sendStatus(404);

    return;
  }

  res.json(foundTablet);
};

export const tabletsController = {
  getAllTablets,
  getOneTablet,
};
