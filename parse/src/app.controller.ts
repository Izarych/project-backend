import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {EventPattern} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private parseService: AppService) {
  }

  @EventPattern('parse')
  async parseFilms() {
    return this.parseService.parse();
  }
}
