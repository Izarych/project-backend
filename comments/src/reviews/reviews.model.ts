import { Column, DataType, HasMany, Model, setAttributes, setOptions, Table, Unique } from "sequelize-typescript";
import { ReviewComment } from "src/review-comments/review-comments.model";

interface ReviewCreationAttr {
    movieId: number;
    userId: number;
    review: string;
    rate: number;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false, unique: 'movie_id+user_id' })
    movieId: number;

    @Column({ type: DataType.INTEGER, allowNull: false, unique: 'movie_id+user_id' })
    userId: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    review: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    rate: number;

    @HasMany(() => ReviewComment)
    comments: ReviewComment[]
}