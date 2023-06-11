import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from "./movie.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { People } from "../people/people.model";
import { Genres } from "../genres/genres.model";
import { Movie } from './movie.model';

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {
    }

    @ApiOperation({ summary: 'Получение всех фильмов' })
    @ApiResponse({
        status: 200,
        description: 'Получаем все фильмы в ответе',
        type: CreateMovieDto
    })
    @Get()
    async getMovies(): Promise<Movie[]> {
        return await this.movieService.getAllMovies();
    }

    @ApiOperation({ summary: 'Получение фильмов по возрастному ограничению' })
    @ApiParam({
        name: 'ageRate',
        description: 'Возрастное ограничение',
        type: Number,
        example: 14
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем все фильмы в ответе',
        type: CreateMovieDto
    })
    @Get('/age/:ageRate')
    async getMovieByAgeRate(@Param('ageRate') ageRate: number): Promise<Movie[]> {
        return await this.movieService.getMovieByAgeRate(ageRate);
    }

    @ApiOperation({ summary: 'Получение фильмов по стране' })
    @ApiParam({
        name: 'country',
        description: 'Страна',
        type: String,
        example: 'Россия'
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем все фильмы в ответе',
        type: CreateMovieDto
    })
    @Get('/country/:countries')
    async getMovieByCountry(@Param('countries') countries: string): Promise<Movie[]> {
        return await this.movieService.getMovieByCountry(countries);
    }

    @ApiOperation({ summary: 'Получение фильмов по жанру' })
    @ApiParam({
        name: 'genre',
        description: 'Жанр',
        type: String,
        example: 'Драма'
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем все фильмы в ответе',
        type: CreateMovieDto
    })
    @Get('/genre/:genre')
    async getMovieByGenre(@Param('genre') genre: string): Promise<Movie[]> {
        return await this.movieService.getMovieByGenre(genre);
    }

    @ApiOperation({ summary: 'Получение фильмов по рейтингу' })
    @ApiParam({
        name: 'rate',
        description: 'Рейтинг фильма',
        type: Number,
        example: 8
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем все фильмы в ответе',
        type: CreateMovieDto
    })
    @Get('/rate/:rate')
    async getMovieByRate(@Param('rate') rate: number): Promise<Movie[]> {
        return await this.movieService.getMovieByRate(rate)
    }

    @ApiOperation({ summary: 'Получение фильмов по количеству оценок' })
    @ApiParam({
        name: 'ratequan',
        description: 'Количество оценок',
        type: Number,
        example: 427893
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем все фильмы в ответе',
        type: CreateMovieDto
    })
    @Get('/ratequan/:ratequan')
    async getMovieByRateQuantity(@Param('ratequan') rateQuantity: number): Promise<Movie[]> {
        return await this.movieService.getMovieByRateQuantity(rateQuantity)
    }

    @ApiOperation({ summary: 'Получение фильмов по человеку' })
    @ApiParam({
        name: 'fullName',
        description: 'Полное имя человека',
        type: String,
        example: 'Клинт Иствуд'
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем все фильмы в ответе',
        type: CreateMovieDto
    })
    @Get('/human/:fullName')
    async getMovieByHuman(@Param('fullName') fullName: string): Promise<Movie[]> {
        return await this.movieService.getMovieByHuman(fullName)
    }

    @ApiOperation({ summary: 'Получение фильма по id' })
    @ApiParam({
        name: 'id',
        description: 'id фильма',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем фильм в ответе',
        type: CreateMovieDto
    })
    @Get('/:id')
    async getMovie(@Param('id') id: number): Promise<Movie> {
        return await this.movieService.getMovie(id);
    }

    @ApiOperation({ summary: 'Получение всех людей фильма' })
    @ApiParam({
        name: 'id',
        description: 'id фильма',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем людей в ответе',
        type: People
    })
    @Get('/:id/people')
    async getMoviePeople(@Param('id') film_id: number): Promise<People[]> {
        return await this.movieService.getMoviePeople(film_id);
    }

    @ApiOperation({ summary: 'Получение жанров фильма' })
    @ApiParam({
        name: 'id',
        description: 'id фильма',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем жанры в ответе',
        type: Genres
    })
    @Get('/:id/genres')
    async getMovieGenres(@Param('id') film_id: number): Promise<Genres[]> {
        return await this.movieService.getMovieGenres(film_id);
    }

    @ApiOperation({ summary: 'Получение фильма по его названию' })
    @ApiParam({
        name: 'title',
        description: 'Название фильма',
        type: String,
        example: 'movieTitle'
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем фильм в ответе',
        type: CreateMovieDto
    })
    @Get('/title/:title')
    async getMovieByTitle(@Param('title') title: string): Promise<Movie> {
        return await this.movieService.getMovieByTitle(title);
    }

    @EventPattern('create_movie')
    async createMovie(@Payload() data: CreateMovieDto): Promise<Movie> {
        return await this.movieService.createMovie(data);
    }
}
