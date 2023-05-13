import { ApiProperty } from "@nestjs/swagger";

export class UpdateMovieDto {

  @ApiProperty({ example: 1, description: "ID фильма" })
  readonly id: number;

  @ApiProperty({ example: 'movieTitle', description: "Название фильма" })
  readonly title?: string;

  @ApiProperty({ example: 'movieOriginalTitle', description: "Оригинальное название фильма" })
  readonly originalTitle?: string;
  
}