import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { User } from './entities/user';
import { UserRepository } from './repository/user.repository';
import { UserSqliteAdapter } from './adapter/sqlite/user.adapter';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CheckTokenRequest,
  CheckTokenResponse,
  FindAllResponse,
  FindRequest,
  FindResponse,
  USER_SERVICE_NAME,
} from './stubs/user/v1alpha/user';

@Controller('/user')
export class AppController {
  constructor(
    @Inject(UserSqliteAdapter)
    private readonly userService: UserRepository,
  ) {}

  @GrpcMethod(USER_SERVICE_NAME, 'FindAll')
  async getUsers(): Promise<FindAllResponse> {
    return {
      users: (await this.userService.getUsers()).map((user) => user.toJSON()),
    };
  }

  @GrpcMethod(USER_SERVICE_NAME, 'Find')
  async getUser({ id }: FindRequest): Promise<FindResponse> {
    return {
      user: (await this.userService.getUserById(id)).toJSON(),
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<string> {
    return this.userService.login(email, password);
  }

  @Post()
  async createUser(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(email, password);
  }

  // @Post('/test')
  @GrpcMethod(USER_SERVICE_NAME, 'CheckToken')
  async checkToken({ token }: CheckTokenRequest): Promise<CheckTokenResponse> {
    return {
      user: (await this.userService.checkToken(token)).toJSON(),
    };
  }
}
