import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    UsersModule,
    RolesModule, 
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://rabbitmq:5672`],
          // urls: [`amqp://localhost:5672`],
          queue: 'user_queue',
          queueOptions: {
            durable: true,
          },
        }
      }
    ]),

    ConfigModule.forRoot({
      envFilePath: '.development.env'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
