'use strict';
import { Accessories } from '../models/Accessories.model';
import { FindAllOptions } from '../types/findAllOptions';
import { getPagination } from '../utils/helpers';

export class AccessoriesService {
  findById(id: string) {
    return Accessories.findByPk(id);
  }

  findAndCountAll(options: FindAllOptions = {}) {
    const { limit, offset, sortBy, where } = options;

    const orderBy = getPagination(sortBy);

    return Accessories.findAndCountAll({
      limit,
      offset,
      order: orderBy,
      where,
    });
  }

  count() {
    return Accessories.count();
  }
}
