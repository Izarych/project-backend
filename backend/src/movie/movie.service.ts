import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from "./movie.model";
import { InjectModel } from "@nestjs/sequelize";
import { People } from "../people/people.model";
import { Genres } from "../genres/genres.model";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Op } from 'sequelize';

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
        @InjectModel(People) private peopleRepository: typeof People,
        @InjectModel(Genres) private genreRepository: typeof Genres) { }

    async createMovie(dto: CreateMovieDto) {
        const movie = await this.movieRepository.findOne({
            where: {
                title: dto.title,
                originalTitle: dto.originalTitle,
                ageRate: dto.ageRate,
                yearSince: dto.yearSince,
                yearTill: dto.yearTill,
                country: dto.country
            }
        })
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
                    attributes: ['id', 'genre'],
                    through: { attributes: [] }
                },
                {
                    model: People,
                    attributes: ['id', 'fullName', 'profession'],
                    through: { attributes: [] }
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
                through: { attributes: [] }
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
                through: { attributes: [] }
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
            return await movie.$get('images');
        }
        throw new NotFoundException('Фильм не найден')
    }

    async test() {
        const movie = await this.movieRepository.findAll({
            where: {
                //id: [1,2,3]     in []

                // seasons: null,   AND
                // id: 1 

                //title: {[Op.like]: '%Брат%'}
                seasons: {[Op.gte]: 1}
            }
        })
        return movie;
    }
}

//  Для фильтров  https://sequelize.org/docs/v6/core-concepts/model-querying-basics/