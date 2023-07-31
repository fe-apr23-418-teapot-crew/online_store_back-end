'use strict';

const URI =
  'postgres://maksym.nemera:QWErty1234678905@ep-small-cake-09230876.eu-central-1.aws.neon.tech/neondb';

import { Sequelize } from 'sequelize-typescript';
import { models } from './models';

export const initDB = () => {
  return new Sequelize(URI, {
    models,
    dialectOptions: {
      ssl: true,
    },
  });
};
