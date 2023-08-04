'use strict';
const TABLE_NAME = 'tablets';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tablets = require('../src/utils/db/api/tablets.json');

const columnsToRename = [
  {
    oldName: 'namespaceId',
    newName: 'namespace_id',
  },
  {
    oldName: 'capacityAvailable',
    newName: 'capacity_available',
  },
  {
    oldName: 'priceRegular',
    newName: 'price_regular',
  },
  {
    oldName: 'priceDiscount',
    newName: 'price_discount',
  },
  {
    oldName: 'colorsAvailable',
    newName: 'colors_available',
  },
];

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      tablets.map((tablet) => ({
        ...tablet,
        description: JSON.stringify(tablet.description),
      })),
    );

    for (const { oldName, newName } of columnsToRename) {
      await queryInterface.renameColumn(TABLE_NAME, oldName, newName);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
