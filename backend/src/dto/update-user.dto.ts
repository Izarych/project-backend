import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class UpdateUserDto {

  @IsNotEmpty({ message: "Id should not be empty" })
  @IsNumber({}, { message: 'Id must be string' })
  readonly id: number;

  @IsString({ message: 'Password must be string' })
  @Length(4, 16, { message: 'Password length must be between 4 and 16 symbols' })
  readonly password: string;
}