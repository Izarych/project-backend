import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'Email must be string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsString({ message: 'Password must be string' })
  @Length(4, 16, { message: 'Password length must be between 4 and 16 symbols' })
  readonly password: string;
}