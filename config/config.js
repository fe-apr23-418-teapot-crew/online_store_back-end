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
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
};

export const development = {
  ...dbCredentials,
  ...dialectConfig,
};
export const test = {
  ...dbCredentials,
  ...dialectConfig,
};
export const production = {
  ...dbCredentials,
  ...dialectConfig,
};
