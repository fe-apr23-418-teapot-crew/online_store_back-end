'use strict';

import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import phonesRouter from './routes/phones';
import tabletsRouter from './routes/tablets';
import accessoriesRouter from './routes/accessories';
import registrationRouter from './routes/auth';
import usersRouter from './routes/user';
import { initDB } from './initDB';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const createServer = () => {
  const app = express();

  initDB();

  // app.use(
  //   cors({
  //     origin: process.env.CLIENT_URL,
  //     credentials: true,
  //   }),
  // );
  app.use(cors());
  app.use(cookieParser());
  app.use('/products', express.json(), productsRouter);
  app.use('/phones', express.json(), phonesRouter);
  app.use('/tablets', express.json(), tabletsRouter);
  app.use('/accessories', express.json(), accessoriesRouter);
  app.use('/user', express.json(), usersRouter);
  app.use(express.json(), registrationRouter);
  app.use(express.static('public'));
  app.use(errorMiddleware);

  return app;
};
