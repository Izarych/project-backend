import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "./movie.model";
import { People } from "../people/people.model";
import { Genres } from "../genres/genres.model";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Op } from "sequelize";

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie) { }

    async createMovie(dto: CreateMovieDto): Promise<Movie> {
        const movie: Movie = await this.movieRepository.findOne({
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


    async getAllMovies(): Promise<Movie[]> {
        return await this.movieRepository.findAll({
            include: [
                {
                    model: Genres,
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

    async getMovie(id: number): Promise<Movie> {
        return this.movieRepository.findByPk(id, { include: { all: true } });
    }

    async getMoviePeople(id: number): Promise<People[]> {
        const movie: Movie = await this.movieRepository.findByPk(id, {
            include: [
                {
                    model: Genres,
                    through: { attributes: [] }
                },
                {
                    model: People,
                    through: { attributes: [] }
                }
            ]
        })
        if (movie) {
            return movie.people;
        }
        throw new NotFoundException('Фильм не найден')
    }

    async getMovieGenres(id: number): Promise<Genres[]> {
        const movie: Movie = await this.movieRepository.findByPk(id, {
            include: [
                {
                    model: Genres,
                    through: { attributes: [] }
                },
                {
                    model: People,
                    through: { attributes: [] }
                }
            ]
        })
        if (movie) {
            return movie.genres;
        }
        throw new NotFoundException('Фильм не найден')
    }

    async getMovieByAgeRate(ageRate: number): Promise<Movie[]> {
        return await this.movieRepository.findAll({
            where: {
                ageRate: { [Op.lte]: ageRate }
            },
            include: [
                {
                    model: Genres,
                    through: { attributes: [] }
                }
            ]
        });

    }

    async getMovieByCountry(countries: string): Promise<Movie[]> {
        let country: string[] = countries.split('+');
        const array: Movie[] = [];
        const movies: Movie[] = await this.movieRepository.findAll({
            include: [{
                model: Genres,
                through: { attributes: [] }
            }]
        });
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

    async getMovieByHuman(fullName: string): Promise<Movie[]> {
        const array: Movie[] = [];
        const movies: Movie[] = await this.movieRepository.findAll({
            include:
                [
                    {
                        model: Genres,
                        through: { attributes: [] }
                    },
                    {
                        model: People,
                        attributes: ['id', 'fullName', 'profession'],
                        through: { attributes: [] }
                    }
                ]
        });
        for (const movie of movies) {
            for (const item of movie.people) {
                if (item.fullName == fullName) {
                    if (!array.includes(movie)) {
                        array.push(movie)
                    }
                }
            }
        }
        return array
    }

    async getMovieByGenre(genre: string): Promise<Movie[]> {
        const array: Movie[] = [];
        const movies: Movie[] = await this.movieRepository.findAll({
            include: [{
                model: Genres,
                through: { attributes: [] }
            }]
        })
        if (movies) {
            for (const movie of movies) {
                for (const item of movie.genres) {
                    if (item.title == genre) {
                        array.push(movie);
                    }
                }
            }
        }
        return array;
    }

    async getMovieByRate(rate: number): Promise<Movie[]> {
        return await this.movieRepository.findAll({
            where: {
                rate: { [Op.gte]: rate }
            },
            include: [
                {
                    model: Genres,
                    through: { attributes: [] }
                }
            ]
        });
    }

    async getMovieByRateQuantity(rateQuantity: number): Promise<Movie[]> {
        return await this.movieRepository.findAll({
            where: {
                rateQuantity: { [Op.gte]: rateQuantity }
            },
            include: [
                {
                    model: Genres,
                    through: { attributes: [] }
                }
            ]
        });
    }

    async getMovieByTitle(title: string): Promise<Movie> {
        const movie: Movie = await this.movieRepository.findOne({
            where: { title: title },
            include: [
                {
                    model: People,
                    through: { attributes: [] }
                },
                {
                    model: Genres,
                    through: { attributes: [] }
                }
            ]
        })
        if (!movie) {
            throw new NotFoundException('Фильм не найден');
        }
        return movie;
    }
}
