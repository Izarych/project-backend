import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import {MoviePeople} from "./moviepeople.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Movie} from "../movie/movie.model";
import {People} from "./people.model";
import { PeopleController } from './people.controller';

@Module({
  providers: [PeopleService],
  imports: [
    SequelizeModule.forFeature([Movie, People, MoviePeople]),
  ],
  exports: [
    PeopleService
  ],
  controllers: [PeopleController]
})
export class PeopleModule {}
