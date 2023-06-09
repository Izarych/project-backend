import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMovieCommentDto {
    @ApiProperty({ example: 'Любой комментарий', description: "Комментарий" })
    @IsNotEmpty({ message: 'Комментарий не должен быть пустым' })
    @IsString({ message: 'Комментарий должен быть строкой' })
    readonly comment: string;
}