/* eslint-disable @typescript-eslint/no-var-requires */
// const developmentCredentials = require('./dbCredentials/dbCredentials.development.js');
// const testCredentials = require('./dbCredentials/dbCredentials.test.js');
// const productionCredentials = require('./dbCredentials/dbCredentials.production.js');

const DB_HOST = 'ep-small-cake-09230876.eu-central-1.aws.neon.tech';
const DB_PORT = 5432;
const DB_USERNAME = 'maksym.nemera';
const DB_PASSWORD = 'QWErty1234678905';
const DB_NAME = 'neondb';

const dbCredentials = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
};

const dialectConfig = {
  seederStorage: 'sequelize',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
};

const development = {
  ...dbCredentials,
  ...dialectConfig,
};

const test = {
  ...dbCredentials,
  ...dialectConfig,
  test: true,
};

const production = {
  ...dbCredentials,
  ...dialectConfig,
};

module.exports = { development, test, production };
