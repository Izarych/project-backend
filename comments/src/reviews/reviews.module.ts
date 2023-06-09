import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { ReviewCommentsModule } from 'src/review-comments/review-comments.module';
import { ReviewComment } from 'src/review-comments/review-comments.model';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    SequelizeModule.forFeature([Review, ReviewComment]),
    ReviewCommentsModule,
  ],
  exports: [ReviewsService]
})
export class ReviewsModule { }
