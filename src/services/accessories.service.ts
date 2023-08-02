'use strict';
import { Accessories } from '../models/Accessories.model';

export class AccessoriesService {
  findById(id: string) {
    return Accessories.findByPk(id);
  }

  findAndCountAll() {
    return Accessories.findAndCountAll();
  }
}
