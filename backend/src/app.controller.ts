import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AddRoleDto } from "./dto/add-user-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "../guard/roles-auth.decorator";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {firstValueFrom} from "rxjs";

@ApiTags('Gateway App')
@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy,
        @Inject('PARSE_SERVICE') private parseService: ClientProxy,
        @Inject('COMMENT_SERVICE') private commentService: ClientProxy,
        @Inject('AUTH_SERVICE') private authService: ClientProxy) { }

    @ApiOperation({ summary: 'Создание роли' })
    @ApiResponse({ status: 201, type: CreateRoleDto })
    // @Roles('ADMIN') Пока закомментил гварды
    // @UseGuards(RolesGuard)
    @Post('/role')
    async createRole(@Body() dto: CreateRoleDto) {
        return this.userService.send('create.role', dto);
    }

    @ApiOperation({ summary: 'Парсинг с кинопоиска' })
    @ApiResponse({ status: 200, description: 'Парсинг с помощью puppeteer' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/parse')
    async parseFilms() {
        return this.parseService.emit('parse', '');
    }

    @ApiOperation({ summary: 'Получить роль по значению' })
    @ApiResponse({
        status: 200,
        description: 'Получаем роль по её значению',
        schema: {
            type: 'object',
            properties: {
                roleId: {type: 'number', example: 1},
                value: {type: 'string', example: 'ADMIN'},
                description: {type: 'string', example: 'Администратор'}
            }
        }
    })
    @Get('/role/:role')
    async getByValue(@Param('role') role: string) {
        return this.userService.send('get.role.by.value', role);
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({
        status: 200,
        description: 'Получаем всех пользователей',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                email: {type: 'string', example: 'mail@gmail.com'},
                password: {type: 'string', example: 'hashpassword'},
            }
        }
    })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/user')
    async getAllUsers() {
        return this.userService.send('get.all.users', '');
    }

    @ApiOperation({ summary: 'Получаем пользователя по id' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем пользователя по id',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                email: {type: 'string', example: 'mail@gmail.com'},
                password: {type: 'string', example: 'hashpassword'},
            }
        }
    })
    @Get('/user/:id')
    async getOneByIdUser(@Param('id') id: number) {
        return this.userService.send('get.user.id', id);
    }

    @ApiOperation({ summary: 'Добавление роли пользователю по его id' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiBody({
        description: 'Отправляем в body роль которую нужно добавить',
        type: AddRoleDto
    })
    @ApiResponse({
        status: 201,
        description: 'Пользователю добавляется роль',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                email: {type: 'string', example: 'mail@gmail.com'},
                password: {type: 'string', example: 'hashpassword'},
                roles: {
                    properties: {
                        roleId: {type: 'number', example: 1},
                        value: {type: 'string', example: 'USER'},
                        description: {type: 'string', example: 'Пользователь'}
                    }
                }
            }
        }
    })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/user/addrole/:id')
    addRole(@Param('id') userId: number, @Body() dto: AddRoleDto) {
        return this.userService.send('add.role', { userId, value: dto.value });
    }

    @ApiOperation({ summary: 'Удаление роли у пользователя' })
    @ApiParam({
        name: 'value',
        description: 'Значение роли',
        type: String,
        example: 'ADMIN'
    })
    @ApiResponse({
        status: 200,
        description: 'В ответе получаем пользователя у которого удалена роль',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                email: {type: 'string', example: 'mail@gmail.com'},
                password: {type: 'string', example: 'hashpassword'},
                roles: {
                    example: []
                }
            }
        }
    })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/removerole/:id/:value')
    async removeRole(@Param('id') id: number, @Param('value') roleValue: string) {
        return this.userService.send('remove.role', {userId: id, value: roleValue});
    }

    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiBody({
        description: 'В body отправляем любые значения которые хотим обновить',
        type: UpdateUserDto
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем обновленного пользователя по id',
        type: UpdateUserDto
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/user/:id')
    async updatePassword(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        if (dto.password) {
            const hashPassword = await firstValueFrom(this.authService.send('hash_password', dto.password));
            return this.userService.send('update.user', {...dto, id: id, password: hashPassword})
        }
        return this.userService.send('update.user', {...dto, id: id});
    }

    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Пользователь удаляется'
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/:id')
    async deleteUser(@Param('id') id: number) {
        return this.userService.send('delete.user', id);
    }

    @ApiOperation({ summary: 'Создать комментарий' })
    @ApiResponse({
        status: 200,
        type: CreateCommentDto,
        description: 'Комментарий был создан'
    })
    @ApiBody({
        description: 'Отправляем в body данные',
        type: CreateCommentDto
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post('/comment')
    async createComment(@Body() dto: CreateCommentDto) {
        return this.commentService.send('create.comment', dto);
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
    @Get('/comment/increase_rate/:id')
    async increaseRateComment(@Param('id') id: number) {
        return this.commentService.send('increase.rate.comment', id);
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
    @Get('/comment/decrease_rate/:id')
    async decreaseRateComment(@Param('id') id: number) {
        return this.commentService.send('decrease.rate.comment', id);
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
    @Get('/comment')
    async getAllComment() {
        return this.commentService.send('get.all.comment', '');
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
    @Get('/comment/user/:id')
    async getAllCommentByUser(@Param('id') id: number) {
        return this.commentService.send('get.all.comment.user', id);
    }

    @ApiOperation({ summary: 'Получение всех комментариев по review id' })
    @ApiParam({
        name: 'id',
        description: 'review id',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем в ответе все review комментарии',
        schema: {
            type: 'object',
            properties: {
                commentId: {type: 'number', example: 1},
                comment: {type: 'string', example: 'Review comment'},
                rate: {type: 'number', example: 2}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/comment/review/:id')
    async getAllCommentByReview(@Param('id') id: number) {
        return this.commentService.send('get.all.comment.review', id);
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
    @Get('/comment/:id')
    async getOneByIdComment(@Param('id') id: number) {
        return this.commentService.send('get.comment', id);
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
        type: UpdateCommentDto
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
    @Put('/comment/:id')
    async updateComment(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
        return this.commentService.send('update.comment', {id: id, comment: dto.comment});
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
    @Delete('/comment/user/:id')
    async removeCommentByUserId(@Param('id') id: number) {
        return this.commentService.send('remove.comment.userId', id);
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
    @Delete('/comment/:id')
    async removeCommentByCommentId(@Param('id') id: number) {
        return this.commentService.send('remove.comment.commentId', id);
    }

    @ApiOperation({ summary: 'Увеличение рейтинга review' })
    @ApiParam({
        name: 'id',
        description: 'review id',
        type: Number,
        example: 1
    })
    @ApiResponse({ status: 200, description: 'Рейтинг увеличивается на + 1' })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/increase_rate/:id')
    async increaseRateReview(@Param('id') id: number) {
        return this.commentService.send('increase.rate.review', id);
    }

    @ApiOperation({ summary: 'Понижение рейтинга review' })
    @ApiParam({
        name: 'id',
        description: 'review id',
        type: Number,
        example: 1
    })
    @ApiResponse({ status: 200, description: 'Рейтинг уменьшается на - 1' })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/decrease_rate/:id')
    async decreaseRateReview(@Param('id') id: number) {
        return this.commentService.send('decrease.rate.review', id);
    }

    @ApiOperation({ summary: 'Создание review' })
    @ApiBody({
        description: 'Отправляем review в body',
        type: CreateReviewDto
    })
    @ApiResponse({ status: 201, type: CreateReviewDto })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post('/review')
    async createReview(@Body() dto: CreateReviewDto) {
        return this.commentService.send('create.review', dto);
    }

    @ApiOperation({ summary: 'Удаляем все review пользователя' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({ status: 200, description: 'У пользователя удаляются все review' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/review/user/:id')
    async removeReviewByUserId(@Param('id') id: number) {
        return this.commentService.send('remove.review.userId', id);
    }

    @ApiOperation({ summary: 'Удаление review' })
    @ApiParam({
        name: 'id',
        description: 'review id',
        type: Number,
        example: 1
    })
    @ApiResponse({ status: 200, description: 'review удалено' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/review/:id')
    async removeReviewByReviewId(@Param('id') id: number) {
        return this.commentService.send('remove.review.reviewId', id);
    }

    @ApiOperation({ summary: 'Получаем все review' })
    @ApiResponse({
        status: 200,
        description: 'В ответе все review',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                movieId: {type: 'number', example: 1},
                review: {type: 'string', example: 'some review'}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review')
    async getAllReview() {
        return this.commentService.send('get.all.review', '');
    }

    @ApiOperation({ summary: 'Получаем все review пользователя' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'В ответе получаем все review пользователя',
        schema: {
            type: 'object',
            properties: {
                movieId: {type: 'number', example: 1},
                review: {type: 'string', example: 'some review'}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/user/:id')
    async getAllReviewByUserId(@Param('id') id: number) {
        return this.commentService.send('get.all.review.user', id);
    }

    @ApiOperation({ summary: 'Получаем все review фильма' })
    @ApiParam({
        name: 'id',
        description: 'id фильма',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'В ответе получаем все review фильма',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                review: {type: 'string', example: 'some review'}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/movie/:id')
    async getAllReviewByMovieId(@Param('id') id: number) {
        return this.commentService.send('get.all.review.movie', id);
    }

    @ApiOperation({ summary: 'Получаем review' })
    @ApiParam({
        name: 'id',
        description: 'review id',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'В ответе получаем review',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                movieId: {type: 'number', example: 1},
                review: {type: 'string', example: 'some review'}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/:id')
    async getOneReviewById(@Param('id') id: number) {
        return this.commentService.send('get.review', id);
    }

    @ApiOperation({ summary: 'Обновляем review' })
    @ApiBody({
        description: 'В body отправляем новое review',
        type: UpdateReviewDto
    })
    @ApiParam({
        name: 'id',
        description: 'review id',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'В ответе получаем обновленное review',
        schema: {
            type: 'object',
            properties: {
                userId: {type: 'number', example: 1},
                movieId: {type: 'number', example: 1},
                review: {type: 'string', example: 'Any review'}
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/review/:id')
    async updateReview(@Param('id') id: number, @Body() dto: UpdateReviewDto) {
        return this.commentService.send('update.review', {id: id, review: dto.review});
    }
}