import { Module } from '@nestjs/common';
import { MovieCommentsService } from './movie-comments.service';
import { MovieCommentsController } from './movie-comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieComment } from './movie-comments.model';

@Module({
  providers: [MovieCommentsService],
  controllers: [MovieCommentsController],
  imports: [
    SequelizeModule.forFeature([MovieComment]),
  ],
  exports: [MovieCommentsService]
})
export class MovieCommentsModule { }
