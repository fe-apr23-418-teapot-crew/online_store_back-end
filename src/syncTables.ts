'use strict';

import fs from 'fs';
import path from 'path';
import { initDB } from './initDB';
import { Products } from './models/products.model';
import { ProductData } from './types/Products';

const productsFilePath = path.join(
  __dirname,
  'utils',
  'db',
  'api',
  'products.json',
);
const productsData = fs.readFileSync(productsFilePath, 'utf8');
const products = JSON.parse(productsData);

export const syncTables = async () => {
  initDB();

  await Products.sync({ alter: true });

  console.log('Products table was created');
  console.log('Start data products seeding');

  await Promise.all(
    products.map((product: ProductData) => Products.create(product)),
  );

  console.log('all products was seeding');
};

syncTables();
