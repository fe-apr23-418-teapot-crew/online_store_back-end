'use strict';

import fs from 'fs';
import path from 'path';
import { initDB } from './initDB';
import { Products } from './models/products.model';
import { ProductData } from './types/Products';
import { Phones } from './models/phones.model';
import { PhonesData } from './types/Phones';
import { Tablets } from './models/tablets.model';
import { TabletsData } from './types/TabletsTypes';
import { Accessories } from './models/accessories.model';
import { AccessoriesData } from './types/Accessories';

const productsFilePath = (fileName: string) => {
  return path.join(__dirname, 'utils', 'db', 'api', fileName);
};

const productsData = fs.readFileSync(productsFilePath('products.json'), 'utf8');
const products = JSON.parse(productsData);

const phonesData = fs.readFileSync(productsFilePath('phones.json'), 'utf8');
const phones = JSON.parse(phonesData);

const tabletsData = fs.readFileSync(productsFilePath('tablets.json'), 'utf8');
const tablets = JSON.parse(tabletsData);

const accessoriesData = fs.readFileSync(
  productsFilePath('accessories.json'),
  'utf8',
);
const accessories = JSON.parse(accessoriesData);

export const syncTables = async () => {
  initDB();

  await Phones.sync({ alter: true });
  await Promise.all(phones.map((phone: PhonesData) => Phones.create(phone)));

  await Tablets.sync({ alter: true });
  await Promise.all(
    tablets.map((tablet: TabletsData) => Tablets.create(tablet)),
  );

  await Accessories.sync({ alter: true });
  await Promise.all(
    accessories.map((accessorie: AccessoriesData) =>
      Accessories.create(accessorie),
    ),
  );

  await Products.sync({ alter: true });
  await Promise.all(
    products.map((product: ProductData) => Products.create(product)),
  );

  console.log('all products was seeding DONE!!!');
};

syncTables();
