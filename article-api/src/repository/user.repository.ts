import { User } from 'src/entities/user';

export interface UserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | undefined>;
  getUserWithToken(token: string): Promise<User | undefined>;
}
