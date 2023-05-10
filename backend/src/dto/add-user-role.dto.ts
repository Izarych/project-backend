import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  // @ApiProperty({ example: '1', description: "Unique user ID" })
  // @IsNotEmpty({ message: "Id should not be empty" })
  // @IsNumber({}, { message: 'Id must be number' })
  // readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: "Unique name of role" })
  @IsNotEmpty({ message: "Value should not be empty" })
  @IsString({ message: 'Value must be string' })
  readonly value: string;
}