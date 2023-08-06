// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const environmentCredentials = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const dialectConfig = {
  seederStorage: 'sequelize',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
};

const development = {
  ...environmentCredentials,
  ...dialectConfig,
};

const qa = {
  ...environmentCredentials,
  ...dialectConfig,
};

const production = {
  ...environmentCredentials,
  ...dialectConfig,
};

module.exports = { development, qa, production };
