import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateMovieDto } from '../movie/dto/update-movie.dto';
import { UpdateGenreDto } from '../genres/dto/update-genre.dto';
import { MovieService } from '../movie/movie.service';

@Controller('admin')
export class AdminController {

  constructor(private adminService: AdminService, 
              private movieService: MovieService) {
  }

  @Get('/genres')
  async getGenres() {
    return this.adminService.getAllGenres();
  }

  @Get('/genre/:id')
  async getGenre(@Param('id') id: number) {
    return this.adminService.getGenre(id);
  }

  @Put('/genre')
  async updateGenre(@Body() dto: UpdateGenreDto) {
    return this.adminService.updateGenre(dto);
  }


  @Get('/movies')
  async getMovies() {
    return this.movieService.getAllMovies();
  }

  @Get('/movie/:id')
  async getMovie(@Param('id') id: number) {
    return this.movieService.getMovie(id);
  }

  @Get('/movie/age/:ageRate')
  async getMovieByAgeRate(@Param('ageRate') ageRate: number) {
    return this.movieService.getMovieByAgeRate(ageRate);
  }

  @Get('/movie/country/:countries')
  async getMovieByCountry(@Param('countries') countries: string) {
    return this.movieService.getMovieByCountry(countries);
  }

  @Get('/movie/genre/:genre')
  async getMovieByGenre(@Param('genre') genre: string){
    return this.movieService.getMovieByGenre(genre);
  }

  @Get('/movie/rate/:rate')
  async getMovieByRate(@Param('rate') rate: number){
    return this.movieService.getMovieByRate(rate)
  }

  @Get('/movie/ratequan/:ratequan')
  async getMovieByRateQuantity(@Param('ratequan') rateQuantity: number){
    return this.movieService.getMovieByRateQuantity(rateQuantity)
  }

  @Get('/human/:fullName')
  async getMovieByHuman(@Param('fullName') fullName: string){
      return this.movieService.getMovieByHuman(fullName)
  }

  @Get('/movie/:id/people')
  async getMoviePeople(@Param('id') film_id: number) {
      return this.movieService.getMoviePeople(film_id);
  }

  @Get('/movie/:id/genres')
  async getMovieGenres(@Param('id') film_id: number) {
      return this.movieService.getMovieGenres(film_id);
  }

  @Get('/movie/title/:title')
  async getMovieByTitle(@Param('title') title: string) {
    return this.movieService.getMovieByTitle(title);
  }

  @Put('/movie')
  async updateMovie(@Body() dto: UpdateMovieDto) {
    return this.adminService.updateMovie(dto);
  }

  @Delete('/movie/:id')
  async deleteMovie(@Param('id') id: number) {
    return this.adminService.deleteMovie(id);
  }
}
