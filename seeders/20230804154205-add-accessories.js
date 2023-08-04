'use strict';
const TABLE_NAME = 'accessories';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const accessories = require('../src/utils/db/api/phones.json');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      accessories.map((accessory) => ({
        ...accessory,
        description: JSON.stringify(accessory.description),
      })),
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
