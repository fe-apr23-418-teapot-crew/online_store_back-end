/* eslint-disable @typescript-eslint/no-var-requires */
const developmentCredentials = require('./dbCredentials/dbCredentials.development.js');
const testCredentials = require('./dbCredentials/dbCredentials.test.js');
const productionCredentials = require('./dbCredentials/dbCredentials.production.js');


const dialectConfig = {
  seederStorage: 'sequelize',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
};

const development = {
  ...developmentCredentials,
  ...dialectConfig,
};

const test = {
  ...testCredentials,
  ...dialectConfig,
  test: true,
};

const production = {
  ...productionCredentials,
  ...dialectConfig,
};

module.exports = { development, test, production };