'use strict';

import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {
  AccessoriesData,
  AccessoriesDescription,
} from '../types/AccessoriesType';

@Table({
  tableName: 'accessories',
})
export class Accessories extends Model<
  AccessoriesData,
  Partial<AccessoriesData>
> {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'namespace_id',
  })
    namespaceId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    field: 'capacity_available',
  })
    capacityAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'price_regular',
  })
    priceRegular: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'price_discount',
  })
    priceDiscount: number;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    field: 'colors_available',
  })
    colorsAvailable: string[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    color: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
    images: string[];

  @AllowNull(false)
  @Column({
    type: DataType.JSONB,
  })
    description: AccessoriesDescription[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    resolution: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    processor: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    ram: string;

  @Column({
    type: DataType.STRING,
  })
    camera: string;

  @Column({
    type: DataType.STRING,
  })
    zoom: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
    cell: string[];
}
