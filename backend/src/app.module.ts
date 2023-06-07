import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ParseController } from './controllers/parse.controller';
import { JwtModule } from "@nestjs/jwt";
import { ReviewController } from './controllers/review.controller';
import { ReviewCommentController } from './controllers/review-comment.controller';
import { MovieCommentController } from './controllers/movie-comment.controller';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';


@Module({
  controllers: [ParseController, ReviewController, ReviewCommentController, MovieCommentController, RoleController, UserController],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ClientsModule.register([{
      name: 'PARSE_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'parse_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    ClientsModule.register([{
      name: 'USER_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'user_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    ClientsModule.register([{
      name: 'COMMENT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'comment_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'auth_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    JwtModule.register({
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class AppModule { }
