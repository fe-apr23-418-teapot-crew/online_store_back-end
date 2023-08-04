'use strict';

import { Request, Response } from 'express';
import { PhonesData } from '../types/Phones';
import { PhonesService } from '../services/phones.service';
import { ProductsService } from '../services/products.service';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { ProductCategories } from '../types/enums/ProductCategories';

const normalize = ({
  id,
  namespaceId,
  name,
  capacityAvailable,
  capacity,
  priceRegular,
  priceDiscount,
  colorsAvailable,
  color,
  images,
  description,
  screen,
  resolution,
  processor,
  ram,
  camera,
  zoom,
  cell,
}: PhonesData): PhonesData => {
  return {
    id,
    namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  };
};

const getAllPhones = async (req: Request, res: Response) => {
  const phonesService = new PhonesService();
  const productsService = new ProductsService();

  const count = await phonesService.count();

  const { limit = count, offset = 0, sortBy = SortByOptions.ID } = req.query;

  const { isSortByValid, isLimitValid, isOffsetValid } =
    validateQueryParameters(+limit, +offset, sortBy as SortByOptions);

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    res.sendStatus(400);

    return;
  }

  const where = { category: ProductCategories.PHONES };

  const phones = await productsService.findAndCountAll({
    limit: Number(limit),
    offset: Number(offset),
    sortBy: sortBy as SortByOptions,
    where,
  });

  res.json({
    count: phones.count,
    rows: phones.rows,
  });
};

const getOnePhone = async (req: Request, res: Response) => {
  const phonesService = new PhonesService();

  const { phoneId } = req.params;

  if (Number(phoneId)) {
    res.sendStatus(400);

    return;
  }

  const foundPhone = await phonesService.findById(phoneId);

  if (!foundPhone) {
    res.sendStatus(404);

    return;
  }

  res.json(normalize(foundPhone));
};

export const phonesController = {
  getAllPhones,
  getOnePhone,
};
