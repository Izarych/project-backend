import { Controller } from '@nestjs/common';
import {PeopleService} from "./people.service";
import {EventPattern} from "@nestjs/microservices";

@Controller('people')
export class PeopleController {
    constructor(private peopleService: PeopleService) {
    }

    @EventPattern('create_peoples')
    async createPeoples({id, arr}) {
        return this.peopleService.createPeoples(id,arr);
    }
}
