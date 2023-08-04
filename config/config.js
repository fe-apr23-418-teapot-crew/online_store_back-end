/* eslint-disable @typescript-eslint/no-var-requires */
const developmentCredentials = require('./dbCredentials/dbCredentials.development.js');
const qaCredentials = require('./dbCredentials/dbCredentials.qa.js');
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

const qa = {
  ...qaCredentials,
  ...dialectConfig,
};

const production = {
  ...productionCredentials,
  ...dialectConfig,
};

module.exports = { development, qa, production };
