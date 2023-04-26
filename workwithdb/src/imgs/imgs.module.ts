import { Module } from '@nestjs/common';
import { ImgsService } from './imgs.service';
import {Images} from "./imgs.model";
import {Movie} from "../movie/movie.model";
import {SequelizeModule} from "@nestjs/sequelize";
import { ImgsController } from './imgs.controller';

@Module({
  providers: [ImgsService],
  imports: [
    SequelizeModule.forFeature([Movie, Images]),
  ],
  exports: [
    ImgsService
  ],
  controllers: [ImgsController]
})
export class ImgsModule {}
