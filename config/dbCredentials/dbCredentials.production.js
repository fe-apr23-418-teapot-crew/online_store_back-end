// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  username: process.env.DB_PRODUCTION_USERNAME,
  password: process.env.DB_PRODUCTION_PASSWORD,
  database: process.env.DB_PRODUCTION_NAME,
  host: process.env.DB_PRODUCTION_HOST,
  port: process.env.DB_PRODUCTION_PORT,
};