'use strict';
import { Sequelize } from 'sequelize-typescript';
import { Products } from '../models/products.model';
import { OrderItem } from 'sequelize';
import { OrderBy, OrderByColumn } from '../types/enums/Ordering';
import { ProductCategories } from '../types/enums/ProductCategories';
import { SortByOptions } from '../types/enums/Sorting';

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
    const { limit, offset, sortBy, where } = options;

    let orderBy: OrderItem[];

    switch (sortBy) {
    case SortByOptions.ID:
      orderBy = [[OrderByColumn.ID, OrderBy.ASC]];
      break;

    case SortByOptions.PRICE:
      orderBy = [[OrderByColumn.PRICE, OrderBy.ASC]];
      break;

    case SortByOptions.RANDOM:
      orderBy = [[Sequelize.literal('RANDOM()'), OrderBy.ASC]];
      break;

    case SortByOptions.NEW:
      orderBy = [
        [OrderByColumn.YEAR, OrderBy.DESC],
        [OrderByColumn.PRICE, OrderBy.ASC],
      ];
      break;

    case SortByOptions.DISCOUNT:
      orderBy = [
        [
          Sequelize.literal(
            `(${OrderByColumn.FULL_PRICE} - ${OrderByColumn.PRICE})`,
          ),
          OrderBy.DESC,
        ],
      ];
      break;

    default:
      throw new Error(`Invalid type of sort. Your type is ${sortBy}`);
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
