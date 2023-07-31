'use strict';

import { 
  AllowNull,
  Column, 
  DataType, 
  // ForeignKey, 
  Model, 
  Table, 
} from 'sequelize-typescript';

@Table({
  tableName: 'products',
})

export class Products extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    category: string;
  
  @AllowNull(false)
  // @ForeignKey(() => Phones)
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
    type: DataType.INTEGER,
  })
    screen: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    capacity: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    color: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    ram: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    year: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    image: number;
}