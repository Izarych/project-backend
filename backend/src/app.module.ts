import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {ParseModule} from './parse/parse.module';
import {ClientsModule, Transport} from "@nestjs/microservices";


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ClientsModule.register([{
      name: 'DB_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://rabbitmq:5672`],
        queue: 'db_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    ParseModule
  ]
})
export class AppModule { }
