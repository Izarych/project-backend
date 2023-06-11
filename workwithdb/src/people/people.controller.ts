import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from "./people.service";
import { EventPattern } from "@nestjs/microservices";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { People } from "./people.model";

@Controller('people')
export class PeopleController {
    constructor(private peopleService: PeopleService) {
    }

    @EventPattern('create_peoples')
    async createPeoples({ id, arr }): Promise<void> {
        return await this.peopleService.createPeoples(id, arr);
    }

    @ApiOperation({ summary: 'Получение всех людей' })
    @ApiResponse({
        status: 200,
        description: 'Получаем людей в ответе',
        type: People
    })
    @Get()
    async getPeople(): Promise<People[]> {
        return await this.peopleService.getPeople();
    }

    @ApiOperation({ summary: 'Получение людей по имени' })
    @ApiResponse({
        status: 200,
        description: 'Получаем людей в ответе',
        type: People
    })
    @Get('/:fullName')
    async getPeopleByFullName(@Param('fullName') fullName: string): Promise<People[]> {
        return await this.peopleService.getPeopleByFullName(fullName);
    }
}
