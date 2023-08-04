// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

module.exports = {
  username: process.env.DB_TEST_USERNAME,
  password: process.env.DB_TEST_PASSWORD,
  database: process.env.DB_TEST_NAME,
  host: process.env.DB_TEST_HOST,
  port: process.env.DB_TEST_PORT,
};