import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateReviewDto {
    @ApiProperty({ example: 'Any review', description: "Review" })
    @IsNotEmpty({ message: 'Не должен быть пустым' })
    @IsString({ message: 'Должно быть строкой' })
    readonly review: string;
}