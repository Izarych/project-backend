import { Injectable } from '@nestjs/common';
import { Movie } from "./movie.model";
import { InjectModel } from "@nestjs/sequelize";
import { People } from "../people/people.model";
import { Genres } from "../genres/genres.model";

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
        @InjectModel(People) private peopleRepository: typeof People,
        @InjectModel(Genres) private genreRepository: typeof Genres) { }
    
    


}
