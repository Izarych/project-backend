import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { People } from "../people/people.model";
import { MoviePeople } from "../people/moviepeople.model";
import { Genres } from "../genres/genres.model";
import { MovieGenres } from "../genres/moviegenres.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'movies' })
export class Movie extends Model<Movie> {

    @ApiProperty({ example: 1, description: "id фильма" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "Зеленая миля", description: "Название фильма" })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({ example: "The Green Mile", description: "Оригинальное название фильма" })
    @Column({ type: DataType.STRING, allowNull: true })
    originalTitle: string;

    @ApiProperty({ example: 16, description: "Возрастной рейтинг фильма" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    ageRate: number;

    @ApiProperty({ example: "Описание", description: "Описание фильма" })
    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @ApiProperty({ example: 2020, description: "Когда начался сериал" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    yearSince: number;

    @ApiProperty({ example: 2023, description: "Когда закончился сериал" })
    @Column({ type: DataType.INTEGER, allowNull: false })
    yearTill: number;

    @ApiProperty({ example: 'Россия', description: "Страна" })
    @Column({ type: DataType.STRING, allowNull: false })
    country: string;

    @ApiProperty({ example: 2022, description: "Год премьеры в России" })
    @Column({ type: DataType.STRING })
    premierRussia: string;

    @ApiProperty({ example: 2023, description: "Год премьеры в мире" })
    @Column({ type: DataType.STRING })
    premier: string;

    @ApiProperty({ example: 2, description: "Количество сезонов" })
    @Column({ type: DataType.INTEGER })
    seasons: number;

    @ApiProperty({ example: 8, description: "Рейтинг фильма" })
    @Column({ type: DataType.REAL })
    rate: number

    @ApiProperty({ example: 427893, description: "Количество оценок фильма" })
    @Column({ type: DataType.INTEGER })
    rateQuantity: number

    @ApiProperty({ example: 'photolink', description: "Ссылка на вертикальное фото" })
    @Column({ type: DataType.TEXT })
    verticalPhoto: string;

    @ApiProperty({ example: 'photolink', description: "Ссылка на горизонтальное фото" })
    @Column({ type: DataType.TEXT })
    horizontalPhoto: string;

    @ApiProperty({ example: 'trailerlink', description: "Ссылка на трейлер" })
    @Column({ type: DataType.TEXT })
    trailer: string;

    @BelongsToMany(() => People, () => MoviePeople)
    people: People[]

    @BelongsToMany(() => Genres, () => MovieGenres)
    genres: Genres[]

}