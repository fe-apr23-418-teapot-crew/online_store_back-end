'use strict';
const TABLE_NAME = 'phones';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const phones = require('../src/utils/db/api/phones.json');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      phones.map((phone) => ({
        ...phone,
        description: JSON.stringify(phone.description),
      })),
      {},
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
