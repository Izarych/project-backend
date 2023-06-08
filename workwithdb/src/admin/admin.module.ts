import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from '../movie/movie.model';
import { Genres } from '../genres/genres.model';
import { MovieModule } from '../movie/movie.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    SequelizeModule.forFeature([Movie, Genres]),
    MovieModule
  ],
})
export class AdminModule {}
