'use strict';

import { Request, Response } from 'express';
import { PhonesData } from '../types/Phones';
import { PhonesService } from '../services/phones.service';

const normalize = ({
  id,
  namespaceId,
  name,
  capacityAvailable,
  capacity,
  priceRegular,
  priceDiscount,
  colorsAvailable,
  color,
  images,
  description,
  screen,
  resolution,
  processor,
  ram,
  camera,
  zoom,
  cell,
}: PhonesData): PhonesData => {
  return {
    id,
    namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  };
};

const getAllPhones = async (req: Request, res: Response) => {
  const phonesService = new PhonesService();

  const phones = await phonesService.findAndCountAll();

  res.json({
    count: phones.count,
    rows: phones.rows.map(normalize),
  });
};

const getOnePhone = async (req: Request, res: Response) => {
  const phonesService = new PhonesService();

  const { phoneId } = req.params;

  if (Number(phoneId)) {
    res.sendStatus(400);

    return;
  }

  const foundPhone = await phonesService.findById(phoneId);

  if (!foundPhone) {
    res.sendStatus(404);

    return;
  }

  res.json(normalize(foundPhone));
};

export const phonesController = {
  getAllPhones,
  getOnePhone,
};
