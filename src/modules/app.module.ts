import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './db/db.config';
import { DbModule } from './db/db.module';
import { AllExceptionFilter } from './filters/exeption.filter';
import { GatewayModule } from './Websockets/gateway.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DbModule,
    GatewayModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      envFilePath: 'cfg.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
