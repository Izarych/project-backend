import {IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({example: 'newemail@mail.ru', description: 'Почта'})
  @IsOptional()
  @IsEmail({},{message: 'Неверная почта'})
  readonly email?: string;

  @ApiProperty({ example: 'lkfahsje', description: "Пароль" })
  @IsOptional()
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(4, 16, { message: 'Длина пароля от 4 до 16 символов' })
  readonly password?: string;

  @ApiProperty({example: '+79003005025', description: 'Номер телефона'})
  @IsOptional()
  @IsString({message: 'Должен быть строкой'})
  readonly phoneNumber?: string;

  @ApiProperty({example: 'activationlink', description: 'Ссылка активации'})
  @IsOptional()
  readonly activationLink?: string;

}