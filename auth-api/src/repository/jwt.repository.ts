import { User } from 'src/entities/user';

export interface JWTRepository {
  encode(user: User): string;
  decode(token: string): { id: number; email: string };
}
