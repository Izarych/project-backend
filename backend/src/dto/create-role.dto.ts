import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: "Unique role name" })
  @IsNotEmpty({ message: "Value should not be empty" })
  @IsString({ message: 'Value must be string' })
  readonly value: string;

  @ApiProperty({ example: 'Any description', description: "Description of role" })
  @IsNotEmpty({ message: "Description should not be empty" })
  @IsString({ message: 'Description must be string' })
  readonly description: string;
}