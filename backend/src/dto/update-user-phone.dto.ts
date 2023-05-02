import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateUserPhoneDto {

    @IsNotEmpty({ message: "Id should not be empty" })
    @IsNumber({}, { message: 'Id must be number' })
    readonly id: number;

    @IsNotEmpty({ message: "Phonenumber should not be empty" })
    @IsNumber({}, { message: 'Phonenumber must be number' })
    readonly phoneNumber: number;
}