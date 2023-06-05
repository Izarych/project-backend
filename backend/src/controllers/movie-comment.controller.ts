import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "guard/roles-auth.decorator";
import { RolesGuard } from "guard/roles.guard";
import { CreateMovieCommentDto } from "src/dto/create-movie-comment.dto";
import { UpdateMovieCommentDto } from "src/dto/update-movie-comment.dto";


@ApiTags('Gateway App. Movie comments')
@Controller('movie-comment')
export class MovieCommentController {
    constructor(@Inject('COMMENT_SERVICE') private commentService: ClientProxy) { }

    @ApiOperation({ summary: 'Создать комментарий' })
    @ApiResponse({
        status: 200,
        type: CreateMovieCommentDto,
        description: 'Комментарий был создан'
    })
    @ApiBody({
        description: 'Отправляем в body данные',
        type: CreateMovieCommentDto
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async createComment(@Body() dto: CreateMovieCommentDto) {
        return this.commentService.send('create.movie-comment', dto);
    }

    @ApiOperation({ summary: 'Увеличить рейтинг комментария' })
    @ApiParam({
        name: 'id',
        description: 'id комментария',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Рейтинг увеличивается на + 1',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Любой комментарий'},
                rate: {type: 'number', example: 2}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/increase_rate/:id')
    async increaseRateComment(@Param('id') id: number) {
        return this.commentService.send('increase.rate.movie-comment', id);
    }

    @ApiOperation({ summary: 'Понизить рейтинг комментария' })
    @ApiParam({
        name: 'id',
        description: 'id комментария',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Рейтинг комментария - 1',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Любой комментарий'},
                rate: {type: 'number', example: 0}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/decrease_rate/:id')
    async decreaseRateComment(@Param('id') id: number) {
        return this.commentService.send('decrease.rate.movie-comment', id);
    }

    @ApiOperation({ summary: 'Получение всех комментариев' })
    @ApiResponse({
        status: 200,
        description: 'Получаем все комментарии в ответе',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Любой комментарий'},
                rate: {type: 'number', example: 100}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAllComment() {
        return this.commentService.send('get.all.movie-comment', '');
    }

    @ApiOperation({ summary: 'Получить все комментарии пользователя' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'В ответе получаем все комментарии пользователя',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Комментарий пользователя'},
                rate: {type: 'number', example: 2}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/user/:id')
    async getAllCommentByUser(@Param('id') id: number) {
        return this.commentService.send('get.all.movie-comment.user', id);
    }

    @ApiOperation({ summary: 'Получение всех комментариев по movie id' })
    @ApiParam({
        name: 'id',
        description: 'movie id',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем в ответе все комментарии фильма',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Movie comment'},
                rate: {type: 'number', example: 2}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/movie/:id')
    async getAllCommentByMovie(@Param('id') id: number) {
        return this.commentService.send('get.all.movie-comment.movie', id);
    }

    @ApiOperation({ summary: 'Получаем комментарий по его id' })
    @ApiParam({
        name: 'id',
        description: 'id комментария',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем в ответе комментарий по его id',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Любой комментарий'},
                rate: {type: 'number', example: 2}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async getOneByIdComment(@Param('id') id: number) {
        return this.commentService.send('get.movie-comment', id);
    }

    @ApiOperation({ summary: 'Изменить комментарий' })
    @ApiParam({
        name: 'id',
        description: 'id комментария',
        type: Number,
        example: 1
    })
    @ApiBody({
        description: 'Отправляем новый комментарий в body',
        type: UpdateMovieCommentDto
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем в ответе обновленный комментарий',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Новый комментарий'},
                rate: {type: 'number', example: 2}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async updateComment(@Param('id') id: number, @Body() dto: UpdateMovieCommentDto) {
        return this.commentService.send('update.movie-comment', {id: id, comment: dto.comment});
    }

    @ApiOperation({ summary: 'Удаление всех комментариев у пользователя' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({ status: 200, description: 'У пользователя удаляются все комментарии' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/:id')
    async removeCommentByUserId(@Param('id') id: number) {
        return this.commentService.send('remove.movie-comment.userId', id);
    }

    @ApiOperation({ summary: 'Удаление комментария' })
    @ApiParam({
        name: 'id',
        description: 'id комментария',
        type: Number,
        example: 1
    })
    @ApiResponse({ status: 200, description: 'Комментарий удаляется' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async removeCommentByCommentId(@Param('id') id: number) {
        return this.commentService.send('remove.movie-comment.commentId', id);
    }
}