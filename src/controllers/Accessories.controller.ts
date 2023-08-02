'use strict';

import { Request, Response } from 'express';
import { AccessoriesData } from '../types/Accessories';
import { AccessoriesService } from '../services/accessories.service';

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
}: AccessoriesData): AccessoriesData => {
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

const getAllAccessories = async (req: Request, res: Response) => {
  const accessoriesService = new AccessoriesService();

  const accessories = await accessoriesService.findAndCountAll();

  res.json({
    count: accessories.count,
    rows: accessories.rows.map(normalize),
  });
};

const getOneAccessories = async (req: Request, res: Response) => {
  const accessoriesService = new AccessoriesService();

  const { accessoriesId } = req.params;

  if (Number(accessoriesId)) {
    res.sendStatus(400);

    return;
  }

  const foundAccessories = await accessoriesService.findById(accessoriesId);

  if (!foundAccessories) {
    res.sendStatus(404);

    return;
  }

  res.json(normalize(foundAccessories));
};

export const accessoriesController = {
  getAllAccessories,
  getOneAccessories,
};
