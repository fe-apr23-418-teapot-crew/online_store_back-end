'use strict';

import { Request, Response } from 'express';
import { TabletsData } from '../types/TabletsTypes';
import { TabletsService } from '../services/tablets.service';

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
}: TabletsData): TabletsData => {
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

const getAllTablets = async (req: Request, res: Response) => {
  const tabletsService = new TabletsService();

  const tablets = await tabletsService.findAndCountAll();

  res.json({
    count: tablets.count,
    rows: tablets.rows.map(normalize),
  });
};

const getOneTablet = async (req: Request, res: Response) => {
  const tabletsService = new TabletsService();

  const { tabletId } = req.params;

  if (Number(tabletId)) {
    res.sendStatus(400);

    return;
  }

  const foundTablet = await tabletsService.findById(tabletId);

  if (!foundTablet) {
    res.sendStatus(404);

    return;
  }

  res.json(normalize(foundTablet));
};

export const tabletsController = {
  getAllTablets,
  getOneTablet,
};
