import {Controller, Get, Param} from '@nestjs/common';
import {MovieService} from "./movie.service";
import {EventPattern, Payload} from "@nestjs/microservices";
import {CreateMovieDto} from "./dto/create-movie.dto";

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {
    }

    @Get()
    async getMovies() {
        return this.movieService.getAllMovies();
    }

    @Get('/age/:ageRate')
    async getMovieByAgeRate(@Param('ageRate') ageRate: number) {
        return this.movieService.getMovieByAgeRate(ageRate);
    }

    @Get('/country/:countries')
    async getMovieByCountry(@Param('countries') countries: string) {
        return this.movieService.getMovieByCountry(countries);
    }

    @Get('/genre/:genre')
    async getMovieByGenre(@Param('genre') genre: string){
        return this.movieService.getMovieByGenre(genre);
    }

    @Get('/rate/:rate')
    async getMovieByRate(@Param('rate') rate: number){
        return this.movieService.getMovieByRate(rate)
    }

    @Get('/ratequan/:ratequan')
    async getMovieByRateQuantity(@Param('ratequan') rateQuantity: number){
        return this.movieService.getMovieByRateQuantity(rateQuantity)
    }

    @Get('/human/:fullName')
    async getMovieByHuman(@Param('fullName') fullName: string){
        return this.movieService.getMovieByHuman(fullName)
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

    @Get('/title/:title')
    async getMovieByTitle(@Param('title') title: string) {
        return this.movieService.getMovieByTitle(title);
    }

    @EventPattern('create_movie')
    async createMovie(@Payload() data: CreateMovieDto) {
        return this.movieService.createMovie(data);
    }
}
