import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import {GenresModule} from "../genres/genres.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Movie} from "./movie.model";
import {People} from "../people/people.model";
import {MoviePeople} from "../people/moviepeople.model";
import {Genres} from "../genres/genres.model";
import {MovieGenres} from "../genres/moviegenres.model";
import {PeopleModule} from "../people/people.module";

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [
    SequelizeModule.forFeature([Movie, People, MoviePeople, Genres, MovieGenres]),
    PeopleModule,
    GenresModule
  ],
  exports: [
    MovieService
  ]
})
export class MovieModule {}
