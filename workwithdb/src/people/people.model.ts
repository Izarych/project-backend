import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {MoviePeople} from "./moviepeople.model";
import {Movie} from "../movie/movie.model";

@Table({ tableName: 'people', createdAt: false, updatedAt: false })
export class People extends Model<People> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string;

    @Column({ type: DataType.STRING })
    fullNameOrig: string;

    @Column({ type: DataType.STRING, allowNull: false })
    profession: string;

    @Column({ type: DataType.TEXT })
    photo: string;

    @BelongsToMany(() => Movie, () => MoviePeople)
    movies: Movie[]
}