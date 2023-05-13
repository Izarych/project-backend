import { ApiProperty } from "@nestjs/swagger";

export class UpdateGenreDto {

  @ApiProperty({ example: 1, description: "ID жанра" })
  readonly id: number;

  @ApiProperty({ example: 1, description: "Название жанра" })
  readonly genre: string;
}