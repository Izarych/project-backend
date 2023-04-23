import { Injectable } from '@nestjs/common';
import { Movie } from "./movie.model";
import { InjectModel } from "@nestjs/sequelize";
import { People } from "../people/people.model";
import { Genres } from "../genres/genres.model";
import {CreateMovieDto} from "./dto/create-movie.dto";

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
        @InjectModel(People) private peopleRepository: typeof People,
        @InjectModel(Genres) private genreRepository: typeof Genres) { }
    
    async createMovie(dto: CreateMovieDto) {
        return await this.movieRepository.create(dto);
    }


    async getAllMovies() {
        return this.movieRepository.findAll({include: {all: true}});
    }

    async getMovie(id: number) {
        return this.movieRepository.findByPk(id, {include: {all: true}});
    }
}
