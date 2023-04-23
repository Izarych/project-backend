import {Controller, Get, Param} from '@nestjs/common';
import {MovieService} from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {
    }

    @Get()
    async getMovies() {
        return this.movieService.getAllMovies();
    }

    @Get(':id')
    async getMovie(@Param('id') id: number) {
        return this.movieService.getMovie(id);
    }
}
