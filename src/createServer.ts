'use strict';

import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import { initDB } from './initDB';

export const createServer = () => {
  const app = express();

  initDB();

  app.use(cors({
    origin: 'https://fe-apr23-418-teapot-crew.github.io/online_store_front-end/'
  }));

  app.use('/products', express.json(), productsRouter);

  return app;
};
