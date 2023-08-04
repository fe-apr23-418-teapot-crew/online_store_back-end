'use strict';
const TABLE_NAME = 'tablets';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tablets = require('../src/utils/db/api/phones.json');

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
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
