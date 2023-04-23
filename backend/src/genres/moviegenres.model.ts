import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Genres } from "./genres.model";
import { Movie } from "../movie/movie.model";


@Table({ tableName: 'movie_genres' })
export class MovieGenres extends Model<MovieGenres> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Genres)
    @Column({ type: DataType.INTEGER })
    genreId: number;

    @ForeignKey(() => Movie)
    @Column({ type: DataType.INTEGER })
    movieId: number;
}