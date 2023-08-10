'use strict';

import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { ProductCategories } from '../types/enums/ProductCategories';
import { ProductsDeviceService } from '../services/productsDevice.service';
import { FindAllOptions } from '../types/findAllOptions';
import { Op } from 'sequelize';

const getAllDevices = (productCategory: ProductCategories) => {
  return async (req: Request, res: Response) => {
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

    where.category = productCategory;

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    const tablets = await productsService.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      sortBy: sortBy as SortByOptions,
      where,
    });

    res.json(tablets);
  };
};

const getOneDevice = async (req: Request, res: Response) => {
  const productsDeviceService = new ProductsDeviceService();

  const { deviceId } = req.params;

  if (Number(deviceId)) {
    res.sendStatus(400);

    return;
  }

  const foundDevice = await productsDeviceService.findById(deviceId);

  if (!foundDevice) {
    res.sendStatus(404);

    return;
  }

  res.json(foundDevice);
};

export const devicesController = {
  getAllDevices,
  getOneDevice,
};
