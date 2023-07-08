import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserSqliteAdapter } from './adapter/sqlite/user.adapter';
import { PrismaService } from './adapter/prisma/prisma.service';
import { PasswordAdapter } from './adapter/password/bcrypt/password.adapter';
import { JWTAdapter } from './adapter/jwt/jwt.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret:
        'bb22b7af8569a2b9148cb8f24b8236040fdc2cf82dcb75decfe266d1973bdde2',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AppController],
  providers: [JWTAdapter, UserSqliteAdapter, PrismaService, PasswordAdapter],
})
export class AppModule {}
