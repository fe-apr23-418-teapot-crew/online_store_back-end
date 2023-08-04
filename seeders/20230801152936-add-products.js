'use strict';
const TABLE_NAME = 'products';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const products = require('../src/utils/db/api/products.json');

const columnsToRename = [
  {
    oldName: 'itemId',
    newName: 'item_id',
  },
  {
    oldName: 'fullPrice',
    newName: 'full_price',
  },
];

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(TABLE_NAME, products);

    for (const { oldName, newName } of columnsToRename) {
      await queryInterface.renameColumn(TABLE_NAME, oldName, newName);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
