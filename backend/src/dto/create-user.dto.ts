import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.ru', description: "Почта" })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsEmail({}, { message: 'Неправильно введен  e-mail' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: "Пароль" })
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(4, 16, { message: 'Длина пароля от 4 до 16 символов' })
  readonly password: string;
}