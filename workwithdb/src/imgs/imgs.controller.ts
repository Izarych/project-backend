import { Controller } from '@nestjs/common';
import {ImgsService} from "./imgs.service";
import {EventPattern} from "@nestjs/microservices";

@Controller('imgs')
export class ImgsController {
    constructor(private imagesService: ImgsService) {
    }

    @EventPattern('create_images')
    async createImages({id, arr}) {
        return this.imagesService.createImages(id, arr);
    }
}
