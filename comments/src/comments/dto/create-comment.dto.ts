export class CreateCommentDto {
    readonly commentId?: number;
    readonly userId: number;
    readonly comment: string;
    readonly reviewId: number;
}