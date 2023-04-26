import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import {MovieGenres} from "./moviegenres.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Movie} from "../movie/movie.model";
import {People} from "../people/people.model";
import {MoviePeople} from "../people/moviepeople.model";
import {Genres} from "./genres.model";
import { GenresController } from './genres.controller';

@Module({
  providers: [GenresService],
  imports: [
    SequelizeModule.forFeature([Movie, People, MoviePeople, Genres, MovieGenres]),
  ],
  exports: [
    GenresService
  ],
  controllers: [GenresController]
})
export class GenresModule {}
