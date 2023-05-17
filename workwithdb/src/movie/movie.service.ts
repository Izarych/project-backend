import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Movie} from "./movie.model";
import {People} from "../people/people.model";
import {Genres} from "../genres/genres.model";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {Op} from "sequelize";

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
                // @InjectModel(People) private peopleRepository: typeof People,
                // @InjectModel(Genres) private genreRepository: typeof Genres
                ) { }

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
        return await this.movieRepository.findAll({
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
                },
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

    async getMovieByAgeRate(ageRate: number) {
        return await this.movieRepository.findAll({
            where: {
                ageRate: {[Op.lte]: ageRate}
            },
            include: [
                {
                    model: Genres,
                    attributes: ['id', 'genre'],
                    through: {attributes: []}
                },
                {
                    model: People,
                    attributes: ['id', 'fullName', 'profession'],
                    through: {attributes: []}
                }
            ]
        });

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

    async getMovieByHuman(fullName: string){
        const array = [];
        const movies = await this.movieRepository.findAll({
            include: [{
                model: People,
                attributes: ['fullName'],
                through: { attributes: [] }
            }]
        });
        for (const movie of movies) {
            for (const item of movie.people) {
                if(item.fullName == fullName){
                    if(!array.includes(movie)){
                        array.push(movie)
                    }
                }
            }
        }
        return array
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
        return await this.movieRepository.findAll({
            where: {
                rate: {[Op.gte]: rate}
            }
        });
    }

    async getMovieByRateQuantity(rateQuantity: number) {
        return await this.movieRepository.findAll({
            where: {
                rateQuantity: {[Op.gte]: rateQuantity}
            }
        });
    }

    async getMovieByTitle(title: string) {
        const movie = await this.movieRepository.findOne({where: {title: title},
            include: [
                {
                    model: People,
                    through: {attributes: []}
                },
                {
                    model: Genres,
                    through: {attributes: []}
                }
            ]})
        if (!movie) {
            throw new NotFoundException('Фильм не найден');
        }
        return movie;
    }
}
