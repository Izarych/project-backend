import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "guard/roles-auth.decorator";
import { RolesGuard } from "guard/roles.guard";
import { firstValueFrom, Observable } from "rxjs";
import { CreateReviewCommentDto } from "src/dto/create-review-comment.dto";
import { UpdateReviewCommentDto } from "src/dto/update-review-comment.dto";
import { IReviewComment } from "src/interfaces/IReviewComment";

@ApiTags('Gateway App. Review comments')
@Controller('review-comment')
export class ReviewCommentController {
    constructor(@Inject('COMMENT_SERVICE') private commentService: ClientProxy) { }

    @ApiOperation({ summary: 'Создать комментарий' })
    @ApiResponse({
        status: 200,
        type: CreateReviewCommentDto,
        description: 'Комментарий был создан'
    })
    @ApiBody({
        description: 'Отправляем в body данные',
        type: CreateReviewCommentDto
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async createComment<T>(@Body() dto: CreateReviewCommentDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('create.review-comment', dto));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
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
                commentId: { type: 'number', example: 1 },
                comment: { type: 'string', example: 'Любой комментарий' },
                rate: { type: 'number', example: 2 }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/increase_rate/:id')
    async increaseRateComment<T>(@Param('id') id: number, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('increase.rate.review-comment', id));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
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
                commentId: { type: 'number', example: 1 },
                comment: { type: 'string', example: 'Любой комментарий' },
                rate: { type: 'number', example: 0 }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/decrease_rate/:id')
    async decreaseRateComment<T>(@Param('id') id: number, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('decrease.rate.review-comment', id));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    @ApiOperation({ summary: 'Получение всех комментариев' })
    @ApiResponse({
        status: 200,
        description: 'Получаем все комментарии в ответе',
        schema: {
            type: 'object',
            properties: {
                commentId: { type: 'number', example: 1 },
                comment: { type: 'string', example: 'Любой комментарий' },
                rate: { type: 'number', example: 100 }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAllComment(): Promise<Observable<IReviewComment[]>> {
        return this.commentService.send('get.all.review-comment', '');
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
                commentId: { type: 'number', example: 1 },
                comment: { type: 'string', example: 'Комментарий пользователя' },
                rate: { type: 'number', example: 2 }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/user/:id')
    async getAllCommentByUser(@Param('id') id: number): Promise<Observable<IReviewComment[]>> {
        return this.commentService.send('get.all.review-comment.user', id);
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
                commentId: { type: 'number', example: 1 },
                comment: { type: 'string', example: 'Review comment' },
                rate: { type: 'number', example: 2 }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/:id')
    async getAllCommentByReview(@Param('id') id: number): Promise<Observable<IReviewComment[]>> {
        return this.commentService.send('get.all.review-comment.review', id);
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
                commentId: { type: 'number', example: 1 },
                comment: { type: 'string', example: 'Любой комментарий' },
                rate: { type: 'number', example: 2 }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async getOneByIdComment(@Param('id') id: number): Promise<Observable<IReviewComment>> {
        return this.commentService.send('get.review-comment', id);
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
        type: UpdateReviewCommentDto
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем в ответе обновленный комментарий',
        schema: {
            type: 'object',
            properties: {
                commentId: { type: 'number', example: 1 },
                comment: { type: 'string', example: 'Новый комментарий' },
                rate: { type: 'number', example: 2 }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async updateComment<T>(@Param('id') id: number, @Body() dto: UpdateReviewCommentDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('update.review-comment', { id: id, comment: dto.comment }));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
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
    async removeCommentByUserId(@Param('id') id: number): Promise<Observable<number>> {
        return this.commentService.send('remove.review-comment.userId', id);
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
    async removeCommentByCommentId(@Param('id') id: number): Promise<Observable<number>> {
        return this.commentService.send('remove.review-comment.commentId', id);
    }

    private async checkIfErrorCameBackAndSendResponse(response: any, res: Response) {
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
    }
}