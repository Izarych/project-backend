import {Injectable, NotFoundException} from '@nestjs/common';
import { Movie } from "./movie.model";
import { InjectModel } from "@nestjs/sequelize";
import { People } from "../people/people.model";
import { Genres } from "../genres/genres.model";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
        @InjectModel(People) private peopleRepository: typeof People,
        @InjectModel(Genres) private genreRepository: typeof Genres) { }

    async createMovie(dto: CreateMovieDto) {
        const movie = await this.movieRepository.findOne({ where: { ...dto } })
        if (!movie) {
            return await this.movieRepository.create(dto);
        }
        return movie;
    }


    async getAllMovies() {
        return this.movieRepository.findAll({
            include: [
                {
                    model: Genres,
                    attributes: ['id','genre'],
                    through: {attributes: []}
                },
                {
                    model: People,
                    attributes: ['id','fullName', 'profession'],
                    through: {attributes: []}
                }
            ]
        });
    }

    async getMovie(id: number) {
        return this.movieRepository.findByPk(id, { include: { all: true } });
    }

    async getMoviePeople(id: number) {
        const movie = await this.movieRepository.findByPk(id, {
            include: [{
                model: People,
                attributes: ['id', 'fullName', 'fullNameOrig', 'profession', 'photo'],
                through: {attributes: []}
            }]
        })
        if (movie) {
            return movie.people;
        }
        throw new NotFoundException('Фильм не найден')
    }

    async getMovieGenres(id: number) {
        const movie = await this.movieRepository.findByPk(id, {
            include: [{
                model: Genres,
                attributes: ['id', 'genre'],
                through: {attributes: []}
            }]
        })
        if (movie) {
            return movie.genres;
        }
        throw new NotFoundException('Фильм не найден')
    }

    async getMovieImages(id: number) {
        const movie = await this.movieRepository.findByPk(id);
        if (movie) {
            await movie.$get('images');
            return movie.images;
        }
        throw new NotFoundException('Фильм не найден')
    }
}