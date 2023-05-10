import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {

    @ApiProperty({ example: '1', description: "Unique movie ID" })
    @IsNotEmpty({ message: "Movie id should not be empty" })
    @IsNumber({}, { message: 'Movie id must be number' })
    readonly movieId: number;

    @ApiProperty({ example: '1', description: "Unique user ID" })
    @IsNotEmpty({ message: "User id should not be empty" })
    @IsNumber({}, { message: 'User id must be number' })
    readonly userId: number;

    @ApiProperty({ example: 'any review', description: "Review" })
    @IsNotEmpty({ message: "Review should not be empty" })
    @IsString({ message: 'Review must be string' })
    readonly review: string;
}