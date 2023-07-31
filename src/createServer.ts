'use strict'

import express from 'express';

export const createServer = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('hello')
  })

  return app;
}
