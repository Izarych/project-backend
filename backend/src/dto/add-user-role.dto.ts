import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: "Имя роли" })
  @IsNotEmpty({ message: "Не должно быть пустым" })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @IsString( { message: 'Описание должно быть строкой' })
  readonly description: string;
}