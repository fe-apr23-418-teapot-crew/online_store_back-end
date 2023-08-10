'use strict';
export interface UserData {
  id?: number;
  email: string;
  password: string;
  activationToken: string | null;
}

export type NormalizeUser = Pick<UserData, 'id' | 'email'>;
