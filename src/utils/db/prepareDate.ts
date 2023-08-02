'use strict';

import path from 'path';
import fs from 'fs';

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

export const preparedData = {
  products,
  phones,
  tablets,
  accessories,
};
