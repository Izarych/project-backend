import { IsNumber, IsString, Length } from "class-validator";

export class UpdateUserDto {

  @IsNumber({}, {message: 'Должно быть числом'})
  readonly id: number;

  @IsString({message: 'Должно быть строкой'})
  @Length(4, 16, {message: 'Длина должна быть не меньше 4 и не больше 16 символов'})
  readonly password: string;
}