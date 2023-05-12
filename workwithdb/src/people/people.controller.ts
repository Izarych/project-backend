import {Controller, Get} from '@nestjs/common';
import {PeopleService} from "./people.service";
import {EventPattern} from "@nestjs/microservices";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {Genres} from "../genres/genres.model";
import {People} from "./people.model";

@Controller('people')
export class PeopleController {
    constructor(private peopleService: PeopleService) {
    }

    @EventPattern('create_peoples')
    async createPeoples({id, arr}) {
        return this.peopleService.createPeoples(id,arr);
    }

    @ApiOperation({ summary: 'Получение всех людей' })
    @ApiResponse({
        status: 200,
        description: 'Получаем людей в ответе',
        type: People
    })
    @Get()
    async getPeople() {
        return this.peopleService.getPeople();
    }
}
