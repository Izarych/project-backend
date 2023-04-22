import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {People} from "../people/people.model";
import {MoviePeople} from "../people/moviepeople.model";
import {Genres} from "../genres/genres.model";
import {MovieGenres} from "../genres/moviegenres.model";

@Table({tableName: 'movies'})
export class Movie extends Model<Movie> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column
    title: string;

    @Column
    originalTitle: string;

    @Column
    ageRate: string;

    @Column
    description: string;

    @Column
    year: number;

    @Column
    country: string;

    @Column
    premierRussia: string;

    @Column
    premier: string;

    @Column
    img: string;

    //Награды?

    @BelongsToMany(() => People, () => MoviePeople)
    people: People[]

    @BelongsToMany(() => Genres, () => MovieGenres)
    genres: Genres[]
}