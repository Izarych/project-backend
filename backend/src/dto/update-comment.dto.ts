import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto {
    @ApiProperty({ example: 'Любой комментарий', description: "Комментарий" })
    @IsNotEmpty({ message: 'Комментарий не должен быть пустым' })
    @IsString({ message: 'Должен быть строкой' })
    readonly comment: string;
}