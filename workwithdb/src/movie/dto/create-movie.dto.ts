import {ApiProperty} from "@nestjs/swagger";

export class CreateMovieDto {

    @ApiProperty({ example: 'movieTitle', description: "Название фильма" })
    readonly title: string;

    @ApiProperty({ example: 'movieOriginalTitle', description: "Оригинальное название фильма" })
    readonly originalTitle?: string;

    @ApiProperty({ example: '14', description: "Возрастное ограничение" })
    readonly ageRate: number;

    @ApiProperty({ example: 'Описание', description: "Описание фильма" })
    readonly description: string;

    @ApiProperty({ example: 2020, description: "Когда начался сериал" })
    readonly yearSince: number;

    @ApiProperty({ example: 2023, description: "Когда закончился сериал" })
    readonly yearTill: number;

    @ApiProperty({ example: 'Россия', description: "Страна" })
    readonly country: string;

    @ApiProperty({ example: 2022, description: "Год премьеры в России" })
    readonly premierRussia: string;

    @ApiProperty({ example: 2023, description: "Год премьеры в мире" })
    readonly premier: string;

    @ApiProperty({ example: 2, description: "Количество сезонов" })
    readonly seasons: number;

    @ApiProperty({ example: 8, description: "Рейтинг фильма" })
    readonly rate: number;

    @ApiProperty({ example: 427893, description: "Количество оценок фильма" })
    readonly rateQuantity: number;

    @ApiProperty({ example: 'photolink', description: "Ссылка на вертикальное фото" })
    readonly verticalPhoto: string;
    
    @ApiProperty({ example: 'photolink', description: "Ссылка на горизонтальное фото" })
    readonly horizontalPhoto?: string;
}