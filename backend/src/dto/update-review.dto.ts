import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateReviewDto {

    @ApiProperty({ example: '1', description: "Unique review ID" })
    @IsNotEmpty({ message: "Review id should not be empty" })
    @IsNumber({}, { message: 'Review id must be number' })
    readonly reviewId: number;

    @ApiProperty({ example: 'Any review', description: "Review" })
    @IsNotEmpty({ message: 'Review should not be empty' })
    @IsString({ message: 'Review must be string' })
    readonly review: string;
}