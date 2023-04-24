import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from "./movie.model";
import { InjectModel } from "@nestjs/sequelize";
import { People } from "../people/people.model";
import { Genres } from "../genres/genres.model";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Op, Sequelize } from 'sequelize';

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

    async getMovieByAgeRate(ageRate: number) {
        const movies = await this.movieRepository.findAll({
            where: {
                ageRate: { [Op.lte]: ageRate }
            },
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
        return movies;

    }

    async getMovieByCountry(countries: string) {
        let country = countries.split('+');
        const array = [];
        const movies = await this.movieRepository.findAll();
        for (const item of country) {
            for (const movie of movies) {
                if (movie.country.includes(item)) {
                    if (!array.includes(movie)) {
                        array.push(movie)
                    }
                }
            }
        }
        return array;

    }

    async getMovieByGenre(genre: string) {
        const array = [];
        const movies = await this.movieRepository.findAll({
            include: [{
                model: Genres,
                attributes: ['genre'],
                through: { attributes: [] }
            }]
        })
        if (movies) {
            for (const movie of movies) {
                for (const item of movie.genres) {
                    if (item.genre == genre) {
                        array.push(movie);
                    }
                }
            }
        }
        return array;
    }

    async getMovieByRate(rate: number) {
        const movies = await this.movieRepository.findAll({
            where: {
                rate: { [Op.gte]: rate }
            }
        })
        return movies;
    }

    async getMovieByRateQuantity(rateQuantity: number) {
        const movies = await this.movieRepository.findAll({
            where: {
                rateQuantity: { [Op.gte]: rateQuantity }
            }
        })
        return movies;
    }
}

//  Для фильтров  https://sequelize.org/docs/v6/core-concepts/model-querying-basics/