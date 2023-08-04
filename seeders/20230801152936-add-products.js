'use strict';
const TABLE_NAME = 'products';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const products = require('../src/utils/db/api/products.json');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(TABLE_NAME, products);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
