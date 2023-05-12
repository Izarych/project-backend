import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {

    @ApiProperty({ example: 1, description: "id фильма" })
    @IsNotEmpty({ message: "Не должно быть пустым" })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly movieId: number;

    @ApiProperty({ example: 1, description: "id пользователя" })
    @IsNotEmpty({ message: "Не должен быть пустым" })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly userId: number;

    @ApiProperty({ example: 'any review', description: "Review" })
    @IsNotEmpty({ message: "Не должно быть пустым" })
    @IsString({ message: 'Должно быть строкой' })
    readonly review: string;
}