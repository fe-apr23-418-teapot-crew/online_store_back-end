'use strict';

import { Request, Response } from 'express';
import { productsService } from '../services/products.service';
import { SortByOptions } from '../types/enums/Sorting';
import { validateQueryParameters } from '../utils/helpers';
import { ProductCategories } from '../types/enums/ProductCategories';
import { productsDeviceService } from '../services/productsDevice.service';
import { FindAllOptions } from '../types/findAllOptions';
import { Op } from 'sequelize';
import { ApiError } from '../exceptions/ApiError';
import { ALL_ERROR_MESSAGES, ERROR_CODES } from '../utils/errorMessages';

const getAllDevices = (productCategory: ProductCategories) => {
  return async (req: Request, res: Response) => {
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
      throw ApiError.BadRequest(ALL_ERROR_MESSAGES.INVALID_SORTING, {
        sortBy: isSortByValid ? undefined : ERROR_CODES.INVALID_SORT,
        limit: isLimitValid ? undefined : ERROR_CODES.INVALID_LIMIT,
        offset: isOffsetValid ? undefined : ERROR_CODES.INVALID_OFFSET,
      });
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
  const { deviceId } = req.params;

  if (Number(deviceId)) {
    throw ApiError.BadRequest(ALL_ERROR_MESSAGES.INVALID_ITEM_ID, {
      itemId: ERROR_CODES.INVALID_ITEM_ID,
    });
  }

  const foundDevice = await productsDeviceService.findById(deviceId);

  if (!foundDevice) {
    throw ApiError.NotFound();
  }

  res.json(foundDevice);
};

export const devicesController = {
  getAllDevices,
  getOneDevice,
};
