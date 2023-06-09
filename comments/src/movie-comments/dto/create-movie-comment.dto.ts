export class CreateMovieCommentDto {
    readonly commentId?: number;
    readonly userId: number;
    readonly comment: string;
    readonly movieId: number;
}