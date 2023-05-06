export class CreateReviewDto {
    readonly movieId: number;
    readonly userId: number;
    readonly review: string;
}