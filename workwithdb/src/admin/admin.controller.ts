import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateMovieDto } from '../movie/dto/update-movie.dto';
import { UpdateGenreDto } from '../genres/dto/update-genre.dto';
import { MovieService } from '../movie/movie.service';
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from "@nestjs/swagger";
import { Genres } from 'src/genres/genres.model';
import { Movie } from 'src/movie/movie.model';

@Controller('admin')
export class AdminController {

  constructor(private adminService: AdminService,
    private movieService: MovieService) {
  }

  @ApiOperation({ summary: 'Получение всех жанров' })
  @ApiResponse({
    status: 200,
    description: 'Получаем все жанры в ответе',
    type: Genres
  })
  @Get('/genres')
  async getGenres() : Promise<Genres[]> {
    return this.adminService.getAllGenres();
  }

  @ApiOperation({ summary: 'Получение жанра по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID жанра',
    type: Number,
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем жанр в ответе',
    type: Genres
  })
  @Get('/genre/:id')
  async getGenre(@Param('id') id: number) : Promise<Genres> {
    return this.adminService.getGenre(id);
  }


  @ApiOperation({ summary: 'Обновление жанра' })
  @ApiBody({
    description: 'Отправляем новый жанр в body',
    type: UpdateGenreDto
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем обновленный жанр по id',
    type: UpdateGenreDto
  })
  @Put('/genre')
  async updateGenre(@Body() dto: UpdateGenreDto) : Promise<Genres> {
    return this.adminService.updateGenre(dto);
  }


  @ApiOperation({ summary: 'Получение всех фильмов' })
  @ApiResponse({
    status: 200,
    description: 'Получаем все фильмы в ответе',
    type: Movie
  })
  @Get('/movies')
  async getMovies() : Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }

  @ApiOperation({ summary: 'Получение фильм по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID фильма',
    type: Number,
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильм в ответе',
    type: Movie
  })
  @Get('/movie/:id')
  async getMovie(@Param('id') id: number) : Promise<Movie> {
    return this.movieService.getMovie(id);
  }

  @ApiOperation({ summary: 'Получение фильмов по возрастному рейтингу' })
  @ApiParam({
    name: 'ageRate',
    description: 'Возрастной рейтинг',
    type: Number,
    example: 14
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильмы в ответе',
    type: Movie
  })
  @Get('/movie/age/:ageRate')
  async getMovieByAgeRate(@Param('ageRate') ageRate: number) : Promise<Movie[]> {
    return this.movieService.getMovieByAgeRate(ageRate);
  }

  @ApiOperation({ summary: 'Получение фильмов по странам' })
  @ApiParam({
    name: 'countries',
    description: 'Страны',
    type: String,
    example: "США"
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильмы в ответе',
    type: Movie
  })
  @Get('/movie/country/:countries')
  async getMovieByCountry(@Param('countries') countries: string) : Promise<Movie[]> {
    return this.movieService.getMovieByCountry(countries);
  }

  @ApiOperation({ summary: 'Получение фильмов по жанрам' })
  @ApiParam({
    name: 'genre',
    description: 'Название жанра',
    type: String,
    example: "комендия"
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильмы в ответе',
    type: Movie
  })
  @Get('/movie/genre/:genre')
  async getMovieByGenre(@Param('genre') genre: string) : Promise<Movie[]> {
    return this.movieService.getMovieByGenre(genre);
  }

  @ApiOperation({ summary: 'Получение фильмов по рейтингу' })
  @ApiParam({
    name: 'rate',
    description: 'Рейтинг',
    type: Number,
    example: 5
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильмы в ответе',
    type: Movie
  })
  @Get('/movie/rate/:rate')
  async getMovieByRate(@Param('rate') rate: number) : Promise<Movie[]> {
    return this.movieService.getMovieByRate(rate)
  }

  @ApiOperation({ summary: 'Получение фильмов по количеству оценок' })
  @ApiParam({
    name: 'ratequan',
    description: 'Количество оценок',
    type: Number,
    example: 598324
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильмы в ответе',
    type: Movie
  })
  @Get('/movie/ratequan/:ratequan')
  async getMovieByRateQuantity(@Param('ratequan') rateQuantity: number) : Promise<Movie[]> {
    return this.movieService.getMovieByRateQuantity(rateQuantity)
  }

  // @ApiOperation({ summary: 'Получение фильмов по полному имени человека' })
  // @ApiParam({
  //   name: 'fullName',
  //   description: 'Полное имя человека',
  //   type: String,
  //   example: 'Клинт Иствуд'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Получаем фильмы в ответе',
  //   type: Movie
  // })
  // @Get('/human/:fullName')
  // async getMovieByHuman(@Param('fullName') fullName: string) : Promise<Movie[]> {
  //   return this.movieService.getMovieByHuman(fullName)
  // }

  // @ApiOperation({ summary: 'Получение всех людей участвовавших в фильме' })
  // @ApiParam({
  //   name: 'id',
  //   description: 'ID фильма',
  //   type: Number,
  //   example: 1
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Получаем всех людей в ответе',
  //   type: People
  // })
  // @Get('/movie/:id/people')
  // async getMoviePeople(@Param('id') film_id: number) {
  //   return this.movieService.getMoviePeople(film_id);
  // }

  @ApiOperation({ summary: 'Получение всех жанров фильма' })
  @ApiParam({
    name: 'id',
    description: 'ID фильма',
    type: Number,
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем всех жанров в ответе',
    type: Genres
  })
  @Get('/movie/:id/genres')
  async getMovieGenres(@Param('id') film_id: number) : Promise<Genres[]> {
    return this.movieService.getMovieGenres(film_id);
  }

  @ApiOperation({ summary: 'Получение фильма по названию' })
  @ApiParam({
    name: 'title',
    description: 'Название фильма',
    type: String,
    example: "Брат"
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильм в ответе',
    type: Movie
  })
  @Get('/movie/title/:title')
  async getMovieByTitle(@Param('title') title: string) : Promise<Movie> {
    return this.movieService.getMovieByTitle(title);
  }

  @ApiOperation({ summary: 'Обновление фильма' })
  @ApiBody({
    description: 'Отправляем в body id фильма, title? и/или originalTitle?',
    type: UpdateMovieDto
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем фильм жанр по id',
    type: Movie
  })
  @Put('/movie')
  async updateMovie(@Body() dto: UpdateMovieDto) : Promise<Movie> {
    return this.adminService.updateMovie(dto);
  }

  @ApiOperation({ summary: 'Удаление фильма' })
  @ApiParam({
    name: 'id',
    description: 'id фильма',
    type: Number,
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Получаем в ответ удаленный фильм',
    type: Movie
  })
  @Delete('/movie/:id')
  async deleteMovie(@Param('id') id: number) : Promise<Movie> {
    return this.adminService.deleteMovie(id);
  }
}
