import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserSqliteAdapter } from './adapter/sqlite/user.adapter';
import { PrismaService } from './adapter/prisma/prisma.service';
import { PasswordAdapter } from './adapter/password/bcrypt/password.adapter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UserSqliteAdapter, PrismaService, PasswordAdapter],
})
export class AppModule {}
