export class CreateReviewCommentDto {
    readonly commentId?: number;
    readonly userId: number;
    readonly comment: string;
    readonly reviewId: number;
}