'use strict';

import { initDB } from './initDB';
import { Products } from './models/products.model';
import { ProductData } from './types/Products';
import { Phones } from './models/phones.model';
import { PhonesData } from './types/Phones';
import { Tablets } from './models/tablets.model';
import { TabletsData } from './types/TabletsTypes';
import { Accessories } from './models/Accessories.model';
import { AccessoriesData } from './types/AccessoriesType';
import { preparedData } from './utils/db/prepareDate';

export const syncTables = async () => {
  initDB();

  await Phones.sync({ alter: true });
  await Promise.all(
    preparedData.phones.map((phone: PhonesData) => Phones.create(phone)),
  );

  await Tablets.sync({ alter: true });
  await Promise.all(
    preparedData.tablets.map((tablet: TabletsData) => Tablets.create(tablet)),
  );

  await Accessories.sync({ alter: true });
  await Promise.all(
    preparedData.accessories.map((accessorie: AccessoriesData) =>
      Accessories.create(accessorie),
    ),
  );

  await Products.sync({ alter: true });
  await Promise.all(
    preparedData.products.map((product: ProductData) =>
      Products.create(product),
    ),
  );

  console.log('all products was seeding DONE!!!');
};

syncTables();
