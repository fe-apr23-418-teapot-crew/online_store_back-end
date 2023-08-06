'use strict';
import { Tablets } from '../models/tablets.model';
import { FindAllOptions } from '../types/FindAllOptions';
import { getPagination } from '../utils/helpers';

export class TabletsService {
  findById(id: string) {
    return Tablets.findByPk(id);
  }

  findAndCountAll(options: FindAllOptions = {}) {
    const { limit, offset, sortBy, where } = options;

    const orderBy = getPagination(sortBy);

    return Tablets.findAndCountAll({
      limit,
      offset,
      order: orderBy,
      where,
    });
  }

  count() {
    return Tablets.count();
  }
}
