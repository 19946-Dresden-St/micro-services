import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_V1ALPHA_PACKAGE_NAME } from './stubs/user/v1alpha/user';

async function bootstrap() {
  const appHttp = await NestFactory.create(AppModule);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:4000',

        package: AUTH_V1ALPHA_PACKAGE_NAME,
        protoPath: join(__dirname, '../../proto/user/v1alpha/user.proto'),
      },
    },
  );

  await Promise.all([app.listen(), appHttp.listen(4001, '0.0.0.0')]);
}
bootstrap();
