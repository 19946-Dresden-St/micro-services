import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleSqliteAdapter } from './adapter/sqlite/article.adapter';
import { PrismaService } from './adapter/prisma/prisma.service';
import { GrpcUserAdapter } from './adapter/grpc/user.adapter';
import {
  AUTH_V1ALPHA_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from 'src/stubs/user/v1alpha/user';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE_NAME,
        imports: [],
        inject: [],
        useFactory: () => {
          return {
            name: USER_SERVICE_NAME,
            transport: Transport.GRPC,
            options: {
              url: process.env.AUTH_API_URL ?? `localhost:4000`,
              package: AUTH_V1ALPHA_PACKAGE_NAME,
              loader: {
                includeDirs: [join(__dirname, '../proto')],
              },
              protoPath: [
                join(__dirname, '../../proto/user/v1alpha/user.proto'),
              ],
              keepalive: {
                keepaliveTimeMs: 10 * 1000,
                keepaliveTimeoutMs: 5 * 1000,
                keepalivePermitWithoutCalls: 1,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [ArticleSqliteAdapter, PrismaService, GrpcUserAdapter],
})
export class AppModule {}
