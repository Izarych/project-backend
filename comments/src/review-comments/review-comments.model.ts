import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Review } from "src/reviews/reviews.model";

interface ReviewCommentCreationAttr {
    commentId: number;
    userId: number;
    comment: string;
    rate: number;
}

@Table({ tableName: 'review-comments' })
export class ReviewComment extends Model<ReviewComment, ReviewCommentCreationAttr> {

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

    @ForeignKey(() => Review)
    @Column({ type: DataType.INTEGER })
    reviewId: number;

    @BelongsTo(() => Review)
    review: Review
}