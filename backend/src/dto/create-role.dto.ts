import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: "Уникальное имя роли" })
  @IsNotEmpty({ message: "Значение не должно быть пустым" })
  @IsString({ message: 'Значение должно быть строкой' })
  readonly value: string;

  @ApiProperty({ example: 'Администратор', description: "Описание роли" })
  @IsNotEmpty({ message: "Описание не должно быть пустым" })
  @IsString({ message: 'Описание должно быть строкой' })
  readonly description: string;
}