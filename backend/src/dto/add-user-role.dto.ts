import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddRoleDto {

  @IsNotEmpty({ message: "Id should not be empty" })
  @IsNumber({}, { message: 'Id must be number' })
  readonly id: number;

  @IsNotEmpty({ message: "Value should not be empty" })
  @IsString({ message: 'Value must be string' })
  readonly value: string;
}