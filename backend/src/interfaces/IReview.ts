import { IReviewComment } from "./IReviewComment";

export interface IReview {
    id: number;
    movieId: number;
    userId: number;
    review: string;
    rate: number;
    comments: IReviewComment[];
}