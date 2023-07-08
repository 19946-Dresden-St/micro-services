import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repository/user.repository';
import { ClientGrpc } from '@nestjs/microservices';
import {
  USER_SERVICE_NAME,
  UserServiceClient,
} from 'src/stubs/user/v1alpha/user';
import { filter, first, firstValueFrom, tap } from 'rxjs';

import * as Dto from './dto.user';

@Injectable()
export class GrpcUserAdapter implements UserRepository {
  private userService: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async getUsers(): Promise<User[]> {
    const result = await firstValueFrom(
      this.userService.findAll({}).pipe(first()),
    );

    return result.users.map((user) => Dto.toEntities(user));
  }

  async getUserById(id: number): Promise<User | undefined> {
    const { user } = await firstValueFrom(
      this.userService
        .find({
          id,
        })
        .pipe(first()),
    );

    if (!user) {
      return undefined;
    }

    return Dto.toEntities(user);
  }

  async getUserWithToken(token: string): Promise<User | undefined> {
    const { user } = await firstValueFrom(
      this.userService.checkToken({ token }).pipe(first()),
    );

    if (!user) {
      return undefined;
    }

    return Dto.toEntities(user);
  }
}
