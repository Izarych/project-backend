import { Column, DataType, HasMany, Model, setAttributes, setOptions, Table, Unique } from "sequelize-typescript";
import { Comment } from "src/comments/comments.model";

interface ReviewCreationAttr {
    movieId: number;
    userId: number;
    review: string;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.INTEGER, allowNull: false, unique: 'movie_id+user_id'})
    movieId: number;

    @Column({ type: DataType.INTEGER, allowNull: false, unique: 'movie_id+user_id'})
    userId: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    review: string;

    @HasMany(() => Comment)
    comments: Comment[]
}