import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {People} from "./people.model";
import {Movie} from "../movie/movie.model";

@Table({tableName: 'movie_people', createdAt: false, updatedAt: false})
export class MoviePeople extends Model<MoviePeople> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique:true})
    id: number;

    @ForeignKey(() => People)
    peopleId: number;

    @ForeignKey(() => Movie)
    @Column({type: DataType.INTEGER})
    movieId: number;
}