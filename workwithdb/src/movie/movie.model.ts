import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {People} from "../people/people.model";
import {MoviePeople} from "../people/moviepeople.model";
import {Images} from "../imgs/imgs.model";
import {Genres} from "../genres/genres.model";
import {MovieGenres} from "../genres/moviegenres.model";

@Table({ tableName: 'movies' })
export class Movie extends Model<Movie> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, allowNull: true })
    originalTitle: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    ageRate: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    yearSince: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    yearTill: number;

    @Column({ type: DataType.STRING, allowNull: false })
    country: string;

    @Column({ type: DataType.STRING })
    premierRussia: string;

    @Column({ type: DataType.STRING })
    premier: string;

    @Column({ type: DataType.INTEGER })
    seasons: number;

    @Column({ type: DataType.REAL})
    rate: number

    @Column({ type: DataType.INTEGER})
    rateQuantity: number

    @BelongsToMany(() => People, () => MoviePeople)
    people: People[]

    @BelongsToMany(() => Genres, () => MovieGenres)
    genres: Genres[]

    @HasMany(() => Images)
    images: Images[]
}