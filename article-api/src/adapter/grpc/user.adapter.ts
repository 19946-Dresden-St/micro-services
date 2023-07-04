import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserRepository } from 'src/repository/user.repository';
import { ClientGrpc } from '@nestjs/microservices';
import {
  USER_SERVICE_NAME,
  UserServiceClient,
} from 'src/stubs/user/v1alpha/user';
import { firstValueFrom } from 'rxjs';

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
    const result = await firstValueFrom(this.userService.findAll({}));

    return result.users.map((user) => Dto.toEntities(user));
  }

  async getUserById(id: number): Promise<User> {
    const result = await firstValueFrom(
      this.userService.find({
        id,
      }),
    );

    return Dto.toEntities(result.user);
  }
}
