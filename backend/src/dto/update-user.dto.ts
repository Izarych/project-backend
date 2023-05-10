import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

  @ApiProperty({ example: '1', description: "Unique user ID" })
  @IsNotEmpty({ message: "Id should not be empty" })
  @IsNumber({}, { message: 'Id must be string' })
  readonly id: number;

  @ApiProperty({ example: 'lkfahsje', description: "Password" })
  @IsString({ message: 'Password must be string' })
  @Length(4, 16, { message: 'Password length must be between 4 and 16 symbols' })
  readonly password: string;
}