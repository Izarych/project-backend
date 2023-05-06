import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { Review } from 'src/reviews/reviews.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([Comment, Review]),
  ],
  exports: [CommentsService]
})
export class CommentsModule { }
