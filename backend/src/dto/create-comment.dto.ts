import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: '1', description: "Unique comment ID. If comment is main then commentID == null" })
    @IsNotEmpty({ message: "Comment id should not be empty" })
    @IsNumber({}, { message: 'Comment id must be number' })
    readonly commentId?: number;

    @ApiProperty({ example: '1', description: "Unique user ID" })
    @IsNotEmpty({ message: "User id should not be empty" })
    @IsNumber({}, { message: 'User id must be number' })
    readonly userId: number;

    @ApiProperty({ example: 'any comment', description: "Comment" })
    @IsNotEmpty({ message: "Comment should not be empty" })
    @IsString({ message: 'Comment must be string' })
    readonly comment: string;

    @ApiProperty({ example: '1', description: "Unique review ID" })
    @IsNotEmpty({ message: "Review id should not be empty" })
    @IsNumber({}, { message: 'Review id must be number' })
    readonly reviewId: number;
}