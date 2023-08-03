'use strict';
import { Sequelize } from 'sequelize-typescript';
import { Products } from '../models/products.model';
import { OrderItem } from 'sequelize';

interface FindAllOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  where?: {
    category?: string;
  };
}

export class ProductsService {
  findById(id: number) {
    return Products.findByPk(id);
  }

  findAndCountAll(options: FindAllOptions = {}) {
    const { limit, offset, sortBy = 'id', where } = options;

    let orderBy: OrderItem[];

    if (sortBy === 'RANDOM') {
      orderBy = [[Sequelize.literal('RANDOM()'), 'ASC']];
    } else {
      orderBy = [[sortBy, 'ASC']];
    }

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
