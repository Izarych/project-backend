export interface IReviewComment {
    id: number;
    commentId: number;
    userId: number;
    comment: string;
    rate: number;
    reviewId: number;
}