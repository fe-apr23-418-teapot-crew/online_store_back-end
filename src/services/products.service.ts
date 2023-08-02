'use strict';
import { Products } from '../models/products.model';

interface FindAllOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
}

export class ProductsService {
  findById(id: number) {
    return Products.findByPk(id);
  }

  findAndCountAll(options: FindAllOptions = {}) {
    const {
      limit,
      offset,
      sortBy = 'id',
    } = options;

    return Products.findAndCountAll({
      limit,
      offset,
      order: [[sortBy, 'ASC']],
    });
  }
}