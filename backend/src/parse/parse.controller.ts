import { Controller, Get } from '@nestjs/common';
import { ParseService } from "./parse.service";

@Controller('parse')
export class ParseController {
    constructor(private parseService: ParseService) {
    }

    @Get()
    parseFilms() {
        return this.parseService.parse();
    }

}
