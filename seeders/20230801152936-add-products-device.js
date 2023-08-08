'use strict';
const TABLE_NAME = 'products_device';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const phones = require('../src/utils/db/api/phones.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tablets = require('../src/utils/db/api/tablets.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const accessories = require('../src/utils/db/api/accessories.json');

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
    const allData = [...phones, ...tablets, ...accessories];

    await queryInterface.bulkInsert(
      TABLE_NAME,
      allData.map((device) => ({
        ...device,
        description: JSON.stringify(device.description),
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
