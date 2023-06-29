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

@Controller('/user')
export class AppController {
  constructor(
    @Inject(UserSqliteAdapter)
    private readonly userService: UserRepository,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<User> {
    return this.userService.login(email, password);
  }

  @Post()
  async createUser(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(email, password);
  }
}
