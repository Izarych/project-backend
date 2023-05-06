import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { CommentsModule } from 'src/comments/comments.module';
import { Comment } from 'src/comments/comments.model';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    SequelizeModule.forFeature([Review, Comment]),
    CommentsModule,
  ],
  exports: [ReviewsService]
})
export class ReviewsModule { }
