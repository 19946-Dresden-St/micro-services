import { User } from 'src/entities/user';

import * as P from '@prisma/client';

export const toEntities = (user: P.User): User => {
  return new User(user.id, user.email);
};
