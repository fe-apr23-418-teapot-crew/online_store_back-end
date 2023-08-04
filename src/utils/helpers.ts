'use strict';

import { OrderItem } from 'sequelize';
import { SortByOptions } from '../types/enums/Sorting';
import { OrderBy, OrderByColumn } from '../types/enums/Ordering';
import { Sequelize } from 'sequelize-typescript';
import { ProductCategories } from '../types/enums/ProductCategories';

export const getPagination = (sortBy: SortByOptions | undefined) => {
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

  return orderBy;
};

export const validateQueryParameters = (
  limit: number,
  offset: number,
  sortBy: SortByOptions,
  productType?: ProductCategories,
) => {
  const isSortByValid = Object.values(SortByOptions).includes(sortBy);
  const isLimitValid = !Number.isNaN(Number(limit));
  const isOffsetValid = !Number.isNaN(Number(offset));
  const isProductCategoryValid =
    productType === undefined ||
    Object.values(ProductCategories).includes(productType);

  return {
    isSortByValid,
    isLimitValid,
    isOffsetValid,
    isProductCategoryValid,
  };
};
