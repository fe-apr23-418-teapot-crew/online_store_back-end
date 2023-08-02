'use strict';
import { Phones } from '../models/phones.model';

export class PhonesService {
  findById(id: string) {
    return Phones.findByPk(id);
  }

  findAndCountAll() {
    return Phones.findAndCountAll();
  }
}
