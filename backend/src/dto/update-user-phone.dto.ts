import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserPhoneDto {

    @ApiProperty({ example: '1', description: "Unique user ID" })
    @IsNotEmpty({ message: "Id should not be empty" })
    @IsNumber({}, { message: 'Id must be number' })
    readonly id: number;

    @ApiProperty({ example: '123456798', description: "Unique phonenumber" })
    @IsNotEmpty({ message: "Phonenumber should not be empty" })
    @IsNumber({}, { message: 'Phonenumber must be number' })
    readonly phoneNumber: number;
}