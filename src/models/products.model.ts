'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductData } from '../types/Products';
import { ProductsDevice } from './productsDevice.model';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Products extends Model<ProductData, Partial<ProductData>> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    category: string;

  @AllowNull(false)
  @ForeignKey(() => ProductsDevice)
  @Column({
    type: DataType.STRING,
    field: 'item_id',
  })
    itemId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'full_price',
  })
    fullPrice: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    price: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    color: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    year: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    image: string;

  @BelongsTo(() => ProductsDevice, {
    onDelete: 'RESTRICT',
    foreignKey: 'itemId',
    targetKey: 'id',
  })
    products_device: ProductsDevice | null;
}
