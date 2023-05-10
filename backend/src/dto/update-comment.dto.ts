import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateCommentDto {
    @ApiProperty({ example: '1', description: "Unique comment ID" })
    @IsNotEmpty({ message: "Comment id should not be empty" })
    @IsNumber({}, { message: 'Comment id must be number' })
    readonly id: number;

    @ApiProperty({ example: 'Any comment', description: "Comment" })
    @IsNotEmpty({ message: 'Comment should not be empty' })
    @IsString({ message: 'Comment must be string' })
    readonly comment: string;
}