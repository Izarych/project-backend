import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genres } from '../genres/genres.model';
import { Movie } from '../movie/movie.model';
import { UpdateGenreDto } from '../genres/dto/update-genre.dto';
import { UpdateMovieDto } from '../movie/dto/update-movie.dto';

@Injectable()
export class AdminService {

  constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
              @InjectModel(Genres) private genreRepository: typeof Genres) { }

  async getAllGenres() {
    return await this.genreRepository.findAll();
  }

  async getGenre(id: number) {
    return await this.genreRepository.findByPk(id);
  }

  async updateGenre(dto: UpdateGenreDto) {
    return await this.genreRepository.update(dto, { where: { id: dto.id } });
  }

  async updateMovie(dto: UpdateMovieDto) {
    return await this.movieRepository.update(dto, { where: { id: dto.id } });
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findByPk(id);
    if (!movie) {
      return new HttpException('Movie doesnt exist', HttpStatus.NOT_FOUND);
    }
    await this.movieRepository.destroy({ where: { id } });
    return movie;
  }
}
