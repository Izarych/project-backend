import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.ru', description: "Unique email" })
  @IsString({ message: 'Email must be string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'dawkjhdaw', description: "Password" })
  @IsString({ message: 'Password must be string' })
  @Length(4, 16, { message: 'Password length must be between 4 and 16 symbols' })
  readonly password: string;
}