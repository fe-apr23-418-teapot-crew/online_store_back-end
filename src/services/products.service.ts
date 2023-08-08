'use strict';
import { Products } from '../models/products.model';
import { FindAllOptions } from '../types/findAllOptions';
import { getPagination } from '../utils/helpers';

export class ProductsService {
  findById(id: number) {
    return Products.findByPk(id);
  }
  //          to include all details about device
  // findById(id: number) {
  //   return Products.findByPk(id, {
  //     include: ProductsDevice,
  //   });
  // }

  findAndCountAll(options: FindAllOptions = {}) {
    const { limit, offset, sortBy, where } = options;

    const orderBy = getPagination(sortBy);

    return Products.findAndCountAll({
      limit,
      offset,
      order: orderBy,
      where,
    });
  }

  count() {
    return Products.count();
  }
}
