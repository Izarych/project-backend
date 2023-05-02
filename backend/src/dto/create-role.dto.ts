import { IsString, IsNotEmpty } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty({ message: "Value should not be empty" })
  @IsString({ message: 'Value must be string' })
  readonly value: string;

  @IsNotEmpty({ message: "Description should not be empty" })
  @IsString({ message: 'Description must be string' })
  readonly description: string;
}