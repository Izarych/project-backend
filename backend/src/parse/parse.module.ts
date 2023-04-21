import { Module } from '@nestjs/common';
import { ParseController } from './parse.controller';
import { ParseService } from './parse.service';
import {Axios} from "axios";


@Module({
  controllers: [ParseController],
  providers: [ParseService],
  imports: [],
  exports: [
      ParseService,
  ]
})
export class ParseModule {}
