'use strict';
import { Op } from 'sequelize';
import { Users } from '../models/users.model';
import { CreateUserOptions } from '../types/createUserOptions';

export class UsersService {
  create(options: CreateUserOptions) {
    return Users.create(options);
  }

  findOneByToken(activationToken: string) {
    return Users.findOne({
      where: { activationToken },
    });
  }

  getSelectedActive() {
    return Users.findAndCountAll({
      where: {
        activationToken: {
          [Op.or]: [null, ''],
        },
      },
    });
  }

  getByEmail(email: string) {
    return Users.findOne({
      where: { email },
    });
  }
}
