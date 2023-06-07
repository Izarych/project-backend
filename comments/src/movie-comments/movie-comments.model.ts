import { Column, DataType, Model, Table } from "sequelize-typescript";

interface MovieCommentCreationAttr {
    commentId: number;
    userId: number;
    comment: string;
    rate: number;
    movieId: number;
}

@Table({ tableName: 'movie-comments' })
export class MovieComment extends Model<MovieComment, MovieCommentCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.INTEGER, defaultValue: null })
    commentId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    comment: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    rate: number;

    @Column({ type: DataType.INTEGER, allowNull: false})
    movieId: number;
}