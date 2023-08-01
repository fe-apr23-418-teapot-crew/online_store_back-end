'use strict';

import { Request, Response } from 'express';
import { PhonesData } from '../types/Phones';
import { Phones } from '../models/phones.model';

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
  const phones = await Phones.findAll();

  res.json(phones.map(normalize));
};

const getOnePhone = async (req: Request, res: Response) => {
  const { phoneId } = req.params;

  console.log(phoneId);

  if (Number(phoneId)) {
    res.sendStatus(400);

    return;
  }

  const foundPhone = await Phones.findByPk(phoneId);

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
