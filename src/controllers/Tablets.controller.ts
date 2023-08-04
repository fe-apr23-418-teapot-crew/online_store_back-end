'use strict';

import { Request, Response } from 'express';
import { TabletsData } from '../types/TabletsTypes';
import { TabletsService } from '../services/tablets.service';
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
}: TabletsData): TabletsData => {
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

const getAllTablets = async (req: Request, res: Response) => {
  const tabletsService = new TabletsService();
  const productsService = new ProductsService();

  const count = await tabletsService.count();

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
  const tabletsService = new TabletsService();

  const { tabletId } = req.params;

  if (Number(tabletId)) {
    res.sendStatus(400);

    return;
  }

  const foundTablet = await tabletsService.findById(tabletId);

  if (!foundTablet) {
    res.sendStatus(404);

    return;
  }

  res.json(normalize(foundTablet));
};

export const tabletsController = {
  getAllTablets,
  getOneTablet,
};
