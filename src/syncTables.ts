'use strict';

import { initDB } from './initDB';
import { Products } from './models/products.model';

export const syncTables = async () => {
  initDB();

  await Products.sync({ alter: true });

  console.log('Products table was created');
};

syncTables();
