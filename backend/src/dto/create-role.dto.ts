import { IsString, IsNotEmpty } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty({message: "Should not be empty"})
  @IsString({message: 'Должно быть строкой'})
  readonly value: string;

  @IsNotEmpty({message: "Should not be empty"})
  @IsString({message: 'Должно быть строкой'})
  readonly description: string;
}