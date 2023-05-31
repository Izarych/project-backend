import { Injectable } from '@nestjs/common';
import {Movie} from "../movie/movie.model";
import {InjectModel} from "@nestjs/sequelize";
import {Genres} from "./genres.model";

@Injectable()
export class GenresService {
    constructor(@InjectModel(Genres) private genreRepository: typeof Genres,
                @InjectModel(Movie) private movieRepository: typeof Movie) {
    }

    async createGenres(movie_id: number, genreArr: string[]) : Promise<void> {
        const movie : Movie = await this.movieRepository.findByPk(movie_id);
        for (const element of genreArr) {
            const [genre] = await this.genreRepository.findOrCreate(
                { where: { title: element } }
            )
            const currentGenre : Genres[] = await movie.$get('genres');
            const updatedGenre : Genres[] = currentGenre.concat(genre);
            await movie.$set('genres', updatedGenre);
        }

    }
}
