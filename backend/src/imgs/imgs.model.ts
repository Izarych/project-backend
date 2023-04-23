import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Movie } from "../movie/movie.model";


@Table({ tableName: 'images' })
export class Images extends Model<Images> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.TEXT, unique: true })
    image: string;

    @ForeignKey(() => Movie)
    @Column({type: DataType.INTEGER})
    movieId: number;

    @BelongsTo(() => Movie)
    movie: Movie
}