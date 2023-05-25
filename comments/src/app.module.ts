import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments/comments.model';
import { CommentsModule } from './comments/comments.module';
import { Review } from './reviews/reviews.model';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Review, Comment],
      autoLoadModels: true,
      synchronize: true
    }),
    CommentsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
