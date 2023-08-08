'use strict';

import { Request, Response } from 'express';
import { ProductsDeviceService } from '../services/productsDevice.service';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { ProductsService } from '../services/products.service';
import { ProductCategories } from '../types/enums/ProductCategories';
import { Op } from 'sequelize';
import { FindAllOptions } from '../types/findAllOptions';

const getAllAccessories = async (req: Request, res: Response) => {
  try {
    const productsDeviceService = new ProductsDeviceService();
    const productsService = new ProductsService();

    const count = await productsDeviceService.count();

    const {
      limit = count,
      offset = 0,
      sortBy = SortByOptions.ID,
      name,
    } = req.query;

    const { isSortByValid, isLimitValid, isOffsetValid } =
      validateQueryParameters(+limit, +offset, sortBy as SortByOptions);

    if (!isSortByValid || !isLimitValid || !isOffsetValid) {
      res.sendStatus(400);

      return;
    }

    const where: FindAllOptions['where'] = {};

    where.category = ProductCategories.ACCESSORIES;

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    const accessories = await productsService.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      sortBy: sortBy as SortByOptions,
      where,
    });

    res.json(accessories);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

const getOneAccessories = async (req: Request, res: Response) => {
  try {
    const productsDeviceService = new ProductsDeviceService();

    const { accessoriesId } = req.params;

    if (Number(accessoriesId)) {
      res.sendStatus(400);

      return;
    }

    const foundAccessories = await productsDeviceService.findById(
      accessoriesId,
    );

    if (!foundAccessories) {
      res.sendStatus(404);

      return;
    }

    res.json(foundAccessories);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

export const accessoriesController = {
  getAllAccessories,
  getOneAccessories,
};
