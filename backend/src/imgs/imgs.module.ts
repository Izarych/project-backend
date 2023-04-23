import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { Movie } from "../movie/movie.model";
import { ImagesService } from './imgs.service';
import { Images } from './imgs.model';

@Module({
  providers: [ImagesService],
  imports: [
    SequelizeModule.forFeature([Movie, Images]),
  ],
  exports: [
    ImagesService
  ]
})
export class ImagesModule { }