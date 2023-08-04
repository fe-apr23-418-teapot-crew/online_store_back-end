'use strict';

import { Request, Response } from 'express';
import { AccessoriesData } from '../types/AccessoriesType';
import { AccessoriesService } from '../services/accessories.service';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { ProductsService } from '../services/products.service';
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
}: AccessoriesData): AccessoriesData => {
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

const getAllAccessories = async (req: Request, res: Response) => {
  const accessoriesService = new AccessoriesService();
  const productsService = new ProductsService();

  const count = await accessoriesService.count();

  const {
    limit = count,
    offset = 0,
    sortBy = SortByOptions.ID,
  } = req.query;

  const { 
    isSortByValid, 
    isLimitValid, 
    isOffsetValid, 
  } = validateQueryParameters(
    +limit, 
    +offset, 
    sortBy as SortByOptions, 
  );

  if (!isSortByValid || !isLimitValid || !isOffsetValid) {
    res.sendStatus(400);

    return;
  }

  const where = { category: ProductCategories.ACCESSORIES };

  const accessories = await productsService.findAndCountAll({
    limit: Number(limit),
    offset: Number(offset),
    sortBy: sortBy as SortByOptions,
    where,
  });

  res.json({
    count: accessories.count,
    rows: accessories.rows,
  });
};

const getOneAccessories = async (req: Request, res: Response) => {
  const accessoriesService = new AccessoriesService();

  const { accessoriesId } = req.params;

  if (Number(accessoriesId)) {
    res.sendStatus(400);

    return;
  }

  const foundAccessories = await accessoriesService.findById(accessoriesId);

  if (!foundAccessories) {
    res.sendStatus(404);

    return;
  }

  res.json(normalize(foundAccessories));
};

export const accessoriesController = {
  getAllAccessories,
  getOneAccessories,
};
