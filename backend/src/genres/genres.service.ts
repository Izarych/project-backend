import { Injectable } from '@nestjs/common';
import {Genres} from "./genres.model";
import {InjectModel} from "@nestjs/sequelize";
import {Movie} from "../movie/movie.model";

@Injectable()
export class GenresService {
    constructor(@InjectModel(Genres) private genreRepository: typeof Genres,
                @InjectModel(Movie) private movieRepository: typeof Movie) {
    }

    async createGenres(movie_id: number, genreArr: string[]) {
        const movie = await this.movieRepository.findByPk(movie_id);
        for (const element of genreArr) {
            const [genre] = await this.genreRepository.findOrCreate(
                {where: {genre: element}}
            )
            const currentGenre = await movie.$get('genres');
            const updatedGenre = currentGenre.concat(genre);
            await movie.$set('genres', updatedGenre);
        }

    }

}
