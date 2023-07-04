import { User } from 'src/entities/user';

export interface UserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User>;
}
