// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config({ path: '.env.development' });

module.exports = {
  username: process.env.DB_DEVELOPMENT_USERNAME,
  password: process.env.DB_DEVELOPMENT_PASSWORD,
  database: process.env.DB_DEVELOPMENT_NAME,
  host: process.env.DB_DEVELOPMENT_HOST,
  port: process.env.DB_DEVELOPMENT_PORT,
};
