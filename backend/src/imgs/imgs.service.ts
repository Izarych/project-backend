import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "../movie/movie.model";
import { Images } from './imgs.model';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Images) private imagesRepository: typeof Images,
        @InjectModel(Movie) private movieRepository: typeof Movie) {
    }

    async createImages(movie_id: number, imagesArr: string[]) {
        const movie = await this.movieRepository.findByPk(movie_id);
        for (const element of imagesArr) {
            const [image] = await this.imagesRepository.findOrCreate(
                { where: { image: element } }
            )
            const currentGenre = await movie.$get('images');
            const updatedGenre = currentGenre.concat(image);
            await movie.$set('images', updatedGenre);
        }
    }
}