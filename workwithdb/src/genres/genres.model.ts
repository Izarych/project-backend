import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Movie} from "../movie/movie.model";
import {MovieGenres} from "./moviegenres.model";

@Table({ tableName: 'genres', createdAt: false, updatedAt: false })
export class Genres extends Model<Genres> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true })
    genre: string;

    @BelongsToMany(() => Movie, () => MovieGenres)
    movies: Movie[]
}