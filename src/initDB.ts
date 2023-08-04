'use strict';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { models } from './models';

dotenv.config({ path: '.env.development' });

export const initDB = () => {
  const DB_USERNAME = process.env.DB_DEVELOPMENT_USERNAME;
  const DB_PASSWORD = process.env.DB_DEVELOPMENT_PASSWORD;
  const DB_HOST = process.env.DB_DEVELOPMENT_HOST;
  const DB_PORT = process.env.DB_DEVELOPMENT_PORT;
  const DB_NAME = process.env.DB_DEVELOPMENT_NAME;

  const URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  if (!URI) {
    throw new Error('DB_URI is not defined in the environment variables.');
  }

  return new Sequelize(URI, {
    models,
    dialectOptions: {
      ssl: true,
    },
  });
};
