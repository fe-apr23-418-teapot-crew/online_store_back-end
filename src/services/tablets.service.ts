'use strict';
import { Tablets } from '../models/tablets.model';

export class TabletsService {
  findById(id: string) {
    return Tablets.findByPk(id);
  }

  findAndCountAll() {
    return Tablets.findAndCountAll();
  }
}
