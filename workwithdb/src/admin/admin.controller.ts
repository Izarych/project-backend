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

  @Put('/movie')
  async updateMovie(@Body() dto: UpdateMovieDto) {
    return this.adminService.updateMovie(dto);
  }

  @Delete('/movie/:id')
  async deleteMovie(@Param('id') id: number) {
    return this.adminService.deleteMovie(id);
  }
}
