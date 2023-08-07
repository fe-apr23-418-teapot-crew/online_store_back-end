'use strict';

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import phonesRouter from './routes/phones';
import tabletsRouter from './routes/tablets';
import accessoriesRouter from './routes/accessories';
import { initDB } from './initDB';

dotenv.config();

export const createServer = () => {
  const app = express();

  initDB();

  app.use(cors());

  app.use('/products', express.json(), productsRouter);

  app.use('/phones', express.json(), phonesRouter);

  app.use('/tablets', express.json(), tabletsRouter);

  app.use('/accessories', express.json(), accessoriesRouter);

  app.use(express.static('public'));

  return app;
};
