import { ApiProperty } from "@nestjs/swagger";

export class CreatePeopleDto {

    @ApiProperty({ example: 'Клинт Иствуд', description: "Полное имя человека" })
    readonly fullName: string;

    @ApiProperty({ example: 'Clint Eastwood', description: "Полное имя человека(оригинальный язык)" })
    readonly fullNameOrig?: string;

    @ApiProperty({ example: 'Режиссер', description: "Деятельность человека" })
    readonly profession: string;
    
    @ApiProperty({ example: 'photo', description: "Фото человека" })
    readonly photo: string;

}