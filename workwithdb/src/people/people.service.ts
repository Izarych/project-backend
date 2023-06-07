import { Injectable } from '@nestjs/common';
import { CreatePeopleDto } from "./dto/create-people.dto";
import { Movie } from "../movie/movie.model";
import { InjectModel } from "@nestjs/sequelize";
import { People } from "./people.model";

@Injectable()
export class PeopleService {
    constructor(@InjectModel(Movie) private movieRepository: typeof Movie,
        @InjectModel(People) private peopleRepository: typeof People) {
    }

    async createPeoples(movie_id: number, peopleArr: CreatePeopleDto[]): Promise<void> {
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

    async getPeople(): Promise<People[]> {
        return await this.peopleRepository.findAll({
            include: [
                {
                    model: Movie,
                    attributes: ['id', 'title'],
                    through: { attributes: [] }
                }
            ]
        })
    }

    async getPeopleByFullName(fullName: string): Promise<People[]> {
        const people: People[] = await this.peopleRepository.findAll({
            where: {
                fullName
            },
            include: [
                {
                    model: Movie,
                    attributes: ['id', 'title'],
                    through: { attributes: [] }
                }
            ]
        })

        return people;

    }
}
