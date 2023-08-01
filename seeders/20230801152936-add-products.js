'use strict';

import products from '../src/utils/db/api/products.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'products',
    products,
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete(
    'products',
    {
      name: products.map(({ name }) => name)
    },
  );
}
