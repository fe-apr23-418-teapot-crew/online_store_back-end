'use strict';

import { Request, Response } from 'express';
import path from 'path';

const getImage = (req: Request, res: Response) => {
  const { category, model, color, photoName } = req.params;

  const photoPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'img',
    category,
    model,
    color,
    photoName,
  );

  res.sendFile(photoPath);
};

export const publicController = {
  getImage,
};
