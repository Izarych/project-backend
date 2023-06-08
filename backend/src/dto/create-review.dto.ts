import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {

    @ApiProperty({ example: 1, description: "id фильма" })
    @IsNotEmpty({ message: "id фильма не должно быть пустым" })
    @IsNumber({}, { message: 'id фильма должно быть числом' })
    readonly movieId: number;

    @ApiProperty({ example: 1, description: "id пользователя" })
    @IsNotEmpty({ message: "id пользователя не должен быть пустым" })
    @IsNumber({}, { message: 'id пользователя должно быть числом' })
    readonly userId: number;

    @ApiProperty({ example: 'any review', description: "Review" })
    @IsNotEmpty({ message: "Ревью не должно быть пустым" })
    @IsString({ message: 'Ревью должно быть строкой' })
    readonly review: string;
}