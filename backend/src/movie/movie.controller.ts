import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from "./movie.service";

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {
    }

    @Get()
    async getMovies() {
        return this.movieService.getAllMovies();
    }

    @Get('/rate/:ageRate')
    async getMovieByAgeRate(@Param('ageRate') ageRate: number) {
        return this.movieService.getMovieByAgeRate(ageRate);
    }

    @Get('/:id')
    async getMovie(@Param('id') id: number) {
        return this.movieService.getMovie(id);
    }

    @Get('/:id/people')
    async getMoviePeople(@Param('id') film_id: number) {
        return this.movieService.getMoviePeople(film_id);
    }

    @Get('/:id/genres')
    async getMovieGenres(@Param('id') film_id: number) {
        return this.movieService.getMovieGenres(film_id);
    }

    @Get('/:id/images')
    async getMovieImages(@Param('id') film_id: number) {
        return this.movieService.getMovieImages(film_id);
    }


}
