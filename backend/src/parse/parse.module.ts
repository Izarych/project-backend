import { Module } from '@nestjs/common';
import { ParseController } from './parse.controller';
import { ParseService } from './parse.service';
import { Axios } from "axios";
import { MovieModule } from "../movie/movie.module";
import { PeopleModule } from "../people/people.module";
import { GenresModule } from "../genres/genres.module";
import { ImagesModule } from 'src/imgs/imgs.module';


@Module({
  controllers: [ParseController],
  providers: [ParseService],
  imports: [
    MovieModule,
    PeopleModule,
    GenresModule,
    ImagesModule
  ],
  exports: [
    ParseService,
  ]
})
export class ParseModule { }
