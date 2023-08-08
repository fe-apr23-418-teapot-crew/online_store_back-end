'use strict';
import { ProductCategories } from './enums/ProductCategories';
import { SortByOptions } from './enums/Sorting';

export interface FindAllOptions {
  limit?: number;
  offset?: number;
  sortBy?: SortByOptions;
  where?: {
    category?: ProductCategories;
  };
}
