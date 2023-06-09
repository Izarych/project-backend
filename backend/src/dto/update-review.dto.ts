import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateReviewDto {
    @ApiProperty({ example: 'Any review', description: "Review" })
    @IsNotEmpty({ message: 'Ревью не должен быть пустым' })
    @IsString({ message: 'Ревью должно быть строкой' })
    readonly review: string;
}