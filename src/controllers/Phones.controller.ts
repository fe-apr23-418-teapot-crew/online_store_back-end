'use strict';

import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { ProductCategories } from '../types/enums/ProductCategories';
import { ProductsDeviceService } from '../services/productsDevice.service';
import { FindAllOptions } from '../types/findAllOptions';
import { Op } from 'sequelize';

const getAllPhones = async (req: Request, res: Response) => {
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

    where.category = ProductCategories.PHONES;

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    const phones = await productsService.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      sortBy: sortBy as SortByOptions,
      where,
    });

    res.json(phones);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

const getOnePhone = async (req: Request, res: Response) => {
  try {
    const productsDeviceService = new ProductsDeviceService();

    const { phoneId } = req.params;

    if (Number(phoneId)) {
      res.sendStatus(400);

      return;
    }

    const foundPhone = await productsDeviceService.findById(phoneId);

    if (!foundPhone) {
      res.sendStatus(404);

      return;
    }

    res.json(foundPhone);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

export const phonesController = {
  getAllPhones,
  getOnePhone,
};
