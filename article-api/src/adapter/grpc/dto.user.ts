import { User } from 'src/entities/user';
import { User as StubUser } from 'src/stubs/user/v1alpha/user';

export const toEntities = (user: StubUser): User => {
  return new User(user.id, user.email);
};
