import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Movie } from "../movie/movie.model";
import { MoviePeople } from "./moviepeople.model";


@Table({ tableName: 'people' })
export class People extends Model<People> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    profession: string;

    @BelongsToMany(() => Movie, () => MoviePeople)
    movies: Movie[]
}