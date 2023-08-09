'use strict';
import { Users } from '../models/users.model';
import { CreateUserOptions } from '../types/createUserOptions';

export class UsersService {
  create(options: CreateUserOptions) {
    return Users.create(options);
  }

  findOne(activationToken: string) {
    return Users.findOne({
      where: { activationToken },
    });
  }
}
