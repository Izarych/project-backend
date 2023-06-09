import { Body, Controller, Get, Inject, Param, Post, Res, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "guard/roles-auth.decorator";
import { RolesGuard } from "guard/roles.guard";
import { firstValueFrom, Observable } from "rxjs";
import { CreateRoleDto } from "src/dto/create-role.dto";
import { IRole } from "src/interfaces/IRole";

@ApiTags('Gateway App. Roles')
@Controller('role')
export class RoleController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy) { }

    @ApiOperation({ summary: 'Создание роли' })
    @ApiResponse({ status: 201, type: CreateRoleDto })
    //  @Roles('ADMIN') Пока закомментил гварды
    //  @UseGuards(RolesGuard)
    @Post()
    async createRole<T>(@Body() dto: CreateRoleDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.userService.send('create.role', dto));
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
    }


    @ApiOperation({ summary: 'Получить роль по значению' })
    @ApiResponse({
        status: 200,
        description: 'Получаем роль по её значению',
        schema: {
            type: 'object',
            properties: {
                roleId: { type: 'number', example: 1 },
                value: { type: 'string', example: 'ADMIN' },
                description: { type: 'string', example: 'Администратор' }
            }
        }
    })
    @Get('/:role')
    async getByValue(@Param('role') role: string): Promise<Observable<IRole>> {
        return this.userService.send('get.role.by.value', role);
    }
}