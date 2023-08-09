'use strict';

import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserData } from '../types/User';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class Users extends Model<UserData, Partial<UserData>> {
  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    password: string;

  @Column({
    type: DataType.STRING,
    field: 'activation_token',
  })
    activationToken: string | null;
}
