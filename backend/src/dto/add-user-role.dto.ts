import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {

  @IsNumber({}, {message: 'Должно быть числом'})
  readonly id: number;

  @IsString({message: 'Должно быть строкой'})
  readonly value: string;
}