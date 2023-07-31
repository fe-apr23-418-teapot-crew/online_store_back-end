'use strict';

import express from 'express';
import productsRouter from './routes/products';

export const createServer = () => {
  const app = express();

  app.use('/products', express.json(), productsRouter);

  return app;
};
