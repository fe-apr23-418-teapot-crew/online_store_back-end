'use strict';
import { ProductsDevice } from '../models/productsDevice.model';
import { FindAllOptions } from '../types/findAllOptions';
import { getPagination } from '../utils/helpers';

class ProductsDeviceService {
  findById(id: string) {
    return ProductsDevice.findByPk(id);
  }

  findAndCountAll(options: FindAllOptions = {}) {
    const { limit, offset, sortBy, where } = options;

    const orderBy = getPagination(sortBy);

    return ProductsDevice.findAndCountAll({
      limit,
      offset,
      order: orderBy,
      where,
    });
  }

  count() {
    return ProductsDevice.count();
  }
}

export const productsDeviceService = Object.freeze(new ProductsDeviceService());
