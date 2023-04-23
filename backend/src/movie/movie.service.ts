import { Injectable } from '@nestjs/common';
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
        return this.movieRepository.findAll({ include: { all: true } });
    }

    async getMovie(id: number) {
        return this.movieRepository.findByPk(id, { include: { all: true } });
    }
}
/*    async createPeoples(movie_id: number, peopleArr: string[], profession: string) {
        const movie = await this.movieRepository.findByPk(movie_id);
        for (const element of peopleArr) {
            const [people] = await this.peopleRepository.findOrCreate(
                {
                    where: {
                        fullName: element,
                        profession: profession
                    }
                })
            const currentPeople = await movie.$get('people');
            const updatedPeople = currentPeople.concat(people);
            await movie.$set('people', updatedPeople);
        }
    }*/