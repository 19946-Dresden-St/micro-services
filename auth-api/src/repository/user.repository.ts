import { User } from 'src/entities/user';

export interface UserRepository {
  getUsers(): Promise<User[]>;
  createUser(email: string, password: string): Promise<User>;
  getUserById(id: number): Promise<User>;
  login(email: string, password: string): Promise<User>;
}
