import { User } from 'src/entities/user';
import { JWTRepository } from 'src/repository/jwt.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTAdapter implements JWTRepository {
  constructor(private jwt: JwtService) {}

  static SECRET = 'super-giga-secret';
  encode(user: User): string {
    return this.jwt.sign({ ...user });
  }
  decode(token: string) {
    return this.jwt.verify(token);
  }
}
