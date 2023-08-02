'use strict';

import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import phonesRouter from './routes/phones';
import tabletsRouter from './routes/tablets';
import accessoriesRouter from './routes/accessories';
import publicRouter from './routes/public';
import { initDB } from './initDB';

export const createServer = () => {
  const app = express();

  initDB();

  app.use(cors());

  app.use('/products', express.json(), productsRouter);

  app.use('/phones', express.json(), phonesRouter);

  app.use('/tablets', express.json(), tabletsRouter);

  app.use('/accessories', express.json(), accessoriesRouter);

  app.use('/img', publicRouter);

  return app;
};
