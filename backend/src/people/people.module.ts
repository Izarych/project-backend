import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Movie} from "../movie/movie.model";
import {People} from "./people.model";
import {MoviePeople} from "./moviepeople.model";
import {MovieModule} from "../movie/movie.module";

@Module({
  providers: [PeopleService],
  imports: [
      SequelizeModule.forFeature([Movie, People, MoviePeople]),
  ],
  exports: [
      PeopleService
  ]
})
export class PeopleModule {}
