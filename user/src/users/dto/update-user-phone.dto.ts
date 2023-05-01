import { IsNumber } from "class-validator";

export class UpdateUserPhoneDto {

    @IsNumber({}, { message: 'Должно быть числом' })
    readonly id: number;

    @IsNumber({}, { message: 'Должно быть числом' })
    readonly phoneNumber: number;
}