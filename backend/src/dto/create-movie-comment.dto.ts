import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateMovieCommentDto {
    @ApiProperty({ example: '1 (опционально)', description: "id комментария, если комментарий главный, то = null" })
    @IsOptional()
    @IsNotEmpty({ message: "id комментария не может быть пустым" })
    @IsNumber({}, { message: 'id комментария должно быть числом' })
    readonly commentId?: number;

    @ApiProperty({ example: 1, description: "id пользователя" })
    @IsNotEmpty({ message: "id пользователя не должно быть пустым" })
    @IsNumber({}, { message: 'id пользователя должно быть числом' })
    readonly userId: number;

    @ApiProperty({ example: 'Любой комментарий пользователя', description: "Комментарий" })
    @IsNotEmpty({ message: "Комментарий не должен быть пустым" })
    @IsString({ message: 'Комментарий должен быть строкой' })
    readonly comment: string;

    @ApiProperty({ example: 1, description: "movie id" })
    @IsNotEmpty({ message: "id фильма не должно быть пустым" })
    @IsNumber({}, { message: 'id фильма должно быть числом' })
    readonly movieId: number;
}