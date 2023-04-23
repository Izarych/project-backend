import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "../movie/movie.model";
import { CreatePeopleDto } from './dto/create-people.dto';
import { People } from "./people.model";

@Injectable()
export class PeopleService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
        @InjectModel(People) private peopleRepository: typeof People) {
    }

        async createPeoples(movie_id: number, peopleArr: CreatePeopleDto[]) {
        const movie = await this.movieRepository.findByPk(movie_id);
        for (const element of peopleArr) {
            const [people] = await this.peopleRepository.findOrCreate(
                {
                    where: {
                        ...element
                    }
                })
            const currentPeople = await movie.$get('people');
            const updatedPeople = currentPeople.concat(people);
            await movie.$set('people', updatedPeople);
        }
    }
    // async createPeoples(movie_id: number, peopleArr: string[], profession: string, photo: string) {
    //     const movie = await this.movieRepository.findByPk(movie_id);
    //     for (const element of peopleArr) {
    //         const [people] = await this.peopleRepository.findOrCreate(
    //             {
    //                 where: {
    //                     fullName: element,
    //                     profession: profession,
    //                     photo: photo
    //                 }
    //             })
    //         const currentPeople = await movie.$get('people');
    //         const updatedPeople = currentPeople.concat(people);
    //         await movie.$set('people', updatedPeople);
    //     }
    // }
}
