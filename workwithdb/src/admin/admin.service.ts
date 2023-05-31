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

  async getAllGenres() : Promise<Genres[]> {
    return await this.genreRepository.findAll();
  }

  async getGenre(id: number) : Promise<Genres> {
    return await this.genreRepository.findByPk(id);
  }

  async updateGenre(dto: UpdateGenreDto) : Promise<Genres> {
    const genre : Genres = await this.genreRepository.findByPk(dto.id);
    await genre.update(dto);
    return genre;
  }

  async updateMovie(dto: UpdateMovieDto) : Promise<Movie> {
    const movie : Movie = await this.movieRepository.findByPk(dto.id);
    await movie.update(dto);
    return movie;
  }

  async deleteMovie(id: number) : Promise<Movie> {
    const movie : Movie = await this.movieRepository.findByPk(id);
    if (!movie) {
      throw new HttpException('Movie doesnt exist', HttpStatus.NOT_FOUND);
    }
    await this.movieRepository.destroy({ where: { id } });
    return movie;
  }
}
