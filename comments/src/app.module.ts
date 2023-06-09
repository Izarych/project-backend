import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewComment } from './review-comments/review-comments.model';
import { ReviewCommentsModule } from './review-comments/review-comments.module';
import { Review } from './reviews/reviews.model';
import { ReviewsModule } from './reviews/reviews.module';
import { MovieCommentsModule } from './movie-comments/movie-comments.module';
import { MovieComment } from './movie-comments/movie-comments.model';

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
      models: [Review, ReviewComment, MovieComment],
      autoLoadModels: true,
      synchronize: true
    }),
    ReviewCommentsModule,
    ReviewsModule,
    MovieCommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
