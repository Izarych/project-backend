import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Movie} from "../movie/movie.model";
import {MovieGenres} from "./moviegenres.model";
import {ApiProperty} from "@nestjs/swagger";

@Table({ tableName: 'genres', createdAt: false, updatedAt: false })
export class Genres extends Model<Genres> {
    @ApiProperty({ example: 1, description: "id жанра" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'драма', description: "Название жанра" })
    @Column({ type: DataType.STRING, unique: true })
    genre: string;

    @BelongsToMany(() => Movie, () => MovieGenres)
    movies: Movie[]
}