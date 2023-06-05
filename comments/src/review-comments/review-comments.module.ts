import { Module } from '@nestjs/common';
import { ReviewCommentsService } from './review-comments.service';
import { ReviewCommentsController } from './review-comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewComment } from './review-comments.model';
import { Review } from 'src/reviews/reviews.model';

@Module({
  providers: [ReviewCommentsService],
  controllers: [ReviewCommentsController],
  imports: [
    SequelizeModule.forFeature([ReviewComment, Review]),
  ],
  exports: [ReviewCommentsService]
})
export class ReviewCommentsModule { }
