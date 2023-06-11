import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RolesGuard } from "../../guard/roles.guard";
import { Roles } from "../../guard/roles-auth.decorator";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from "rxjs";

@ApiTags('Gateway App. Parse')
@Controller('parse')
export class ParseController {
    constructor(@Inject('PARSE_SERVICE') private parseService: ClientProxy) { }

    @ApiOperation({ summary: 'Парсинг с кинопоиска' })
    @ApiResponse({ status: 200, description: 'Парсинг с помощью puppeteer' })
    //@Roles('ADMIN')
    //@UseGuards(RolesGuard)
    @Get()
    async parseFilms(): Promise<Observable<void>> {
        return this.parseService.emit('parse', '');
    }
}