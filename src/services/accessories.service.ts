'use strict';
import { Accessories } from '../models/accessories.model';

export class AccessoriesService {
  findById(id: string) {
    return Accessories.findByPk(id);
  }

  findAndCountAll() {
    return Accessories.findAndCountAll();
  }
}
