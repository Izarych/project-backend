import { ApiProperty } from "@nestjs/swagger";

export class UpdateGenreDto {

  @ApiProperty({ example: 1, description: "ID жанра" })
  readonly id: number;

  @ApiProperty({ example: 'Драма', description: "Название жанра" })
  readonly title: string;

  @ApiProperty({example: 'Horror', description: 'Оригинальное название жанра'})
  readonly originalTitle: string;
}