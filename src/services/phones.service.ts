'use strict';
import { Phones } from '../models/phones.model';
import { FindAllOptions } from '../types/FindAllOptions';
import { getPagination } from '../utils/helpers';

export class PhonesService {
  findById(id: string) {
    return Phones.findByPk(id);
  }

  findAndCountAll(options: FindAllOptions = {}) {
    const { limit, offset, sortBy, where } = options;

    const orderBy = getPagination(sortBy);

    return Phones.findAndCountAll({
      limit,
      offset,
      order: orderBy,
      where,
    });
  }

  count() {
    return Phones.count();
  }
}
