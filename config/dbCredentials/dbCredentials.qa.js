// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config({ path: '.env.qa' });

module.exports = {
  username: process.env.DB_QA_USERNAME,
  password: process.env.DB_QA_PASSWORD,
  database: process.env.DB_QA_NAME,
  host: process.env.DB_QA_HOST,
  port: process.env.DB_QA_PORT,
};
