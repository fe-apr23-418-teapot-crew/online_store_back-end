'use strict';
import { Sequelize } from 'sequelize-typescript';
import { Products } from '../models/products.model';
import { OrderItem } from 'sequelize';
import { OrderBy, SortByOptions } from '../types/enums/SortingTypes';
import { ProductCategories } from '../types/enums/ProductCategories';

interface FindAllOptions {
  limit?: number;
  offset?: number;
  sortBy?: SortByOptions;
  where?: {
    category?: ProductCategories;
  };
}

export class ProductsService {
  findById(id: number) {
    return Products.findByPk(id);
  }

  findAndCountAll(options: FindAllOptions = {}) {
    const { limit, offset, sortBy = SortByOptions.ID, where } = options;

    let orderBy: OrderItem[];

    switch (sortBy) {
    case SortByOptions.RANDOM:
      orderBy = [[Sequelize.literal('RANDOM()'), OrderBy.ASC]];
      break;

    case SortByOptions.YEAR:
      orderBy = [
        [SortByOptions.YEAR, OrderBy.DESC],
        [SortByOptions.PRICE, OrderBy.ASC],
      ];
      break;

    default:
      orderBy = [[sortBy, OrderBy.ASC]];
      break;
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
