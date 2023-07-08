import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repository/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import * as Dto from './dto.user';
import { PasswordAdapter } from '../password/bcrypt/password.adapter';
import { PasswordRepository } from 'src/repository/password.repository';
import { JWTAdapter } from '../jwt/jwt.adapter';
import { JWTRepository } from 'src/repository/jwt.repository';

@Injectable()
export class UserSqliteAdapter implements UserRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(PasswordAdapter)
    private readonly passwordRepository: PasswordRepository,
    @Inject(JWTAdapter)
    private readonly tokenRepository: JWTRepository,
  ) {}

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (this.passwordRepository.match(password, user.password)) {
        console.log(Dto.toEntities(user));

        return this.tokenRepository.encode(Dto.toEntities(user));
      }

      return undefined;
    } catch {
      return undefined;
    }
  }

  async getUsers(): Promise<User[]> {
    const dbUsers = await this.prisma.user.findMany();
    return dbUsers.map(Dto.toEntities);
  }

  async createUser(email: string, password: string): Promise<User | undefined> {
    try {
      const dbUser = await this.prisma.user.create({
        data: {
          email,
          password: this.passwordRepository.hash(password),
        },
      });

      console.log('ANTOINE');

      return Dto.toEntities(dbUser);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async getUserById(id: number): Promise<User | undefined> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      return Dto.toEntities(user);
    } catch {
      return undefined;
    }
  }

  async checkToken(token: string): Promise<User> {
    const { id, email } = this.tokenRepository.decode(token);
    return new User(id, email);
  }
}
