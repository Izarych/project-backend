import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {MoviePeople} from "./moviepeople.model";
import {Movie} from "../movie/movie.model";
import {ApiProperty} from "@nestjs/swagger";

@Table({ tableName: 'people', createdAt: false, updatedAt: false })
export class People extends Model<People> {

    @ApiProperty({ example: 1, description: "id человека" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    
    @ApiProperty({ example: 'Клинт Иствуд', description: "Имя" })
    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string;

    @ApiProperty({ example: 'Clint Eastwood', description: "Оригинальное имя" })
    @Column({ type: DataType.STRING })
    fullNameOrig: string;

    @ApiProperty({ example: 'Режиссер', description: "Роль в фильме" })
    @Column({ type: DataType.STRING, allowNull: false })
    profession: string;

    @ApiProperty({ example: 'photolink', description: "Ссылка на фото человека" })
    @Column({ type: DataType.TEXT })
    photo: string;

    @BelongsToMany(() => Movie, () => MoviePeople)
    movies: Movie[]
}