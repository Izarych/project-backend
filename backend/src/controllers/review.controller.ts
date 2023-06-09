import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "guard/roles-auth.decorator";
import { RolesGuard } from "guard/roles.guard";
import { firstValueFrom, Observable } from "rxjs";
import { CreateReviewDto } from "src/dto/create-review.dto";
import { UpdateReviewDto } from "src/dto/update-review.dto";
import { IReview } from "src/interfaces/IReview";

@ApiTags('Gateway App. Reviews')
@Controller('review')
export class ReviewController {
    constructor(@Inject('COMMENT_SERVICE') private commentService: ClientProxy) { }

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
    @Get('/increase_rate/:id')
    async increaseRateReview<T>(@Param('id') id: number, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('increase.rate.review', id));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
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
    @Get('/decrease_rate/:id')
    async decreaseRateReview<T>(@Param('id') id: number, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('decrease.rate.review', id));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    @ApiOperation({ summary: 'Создание review' })
    @ApiBody({
        description: 'Отправляем review в body',
        type: CreateReviewDto
    })
    @ApiResponse({ status: 201, type: CreateReviewDto })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async createReview<T>(@Body() dto: CreateReviewDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('create.review', dto));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
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
    @Delete('/user/:id')
    async removeReviewByUserId(@Param('id') id: number): Promise<Observable<number>> {
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
    @Delete('/:id')
    async removeReviewByReviewId(@Param('id') id: number): Promise<Observable<number>> {
        return this.commentService.send('remove.review.reviewId', id);
    }

    @ApiOperation({ summary: 'Получаем все review' })
    @ApiResponse({
        status: 200,
        description: 'В ответе все review',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                movieId: { type: 'number', example: 1 },
                review: { type: 'string', example: 'some review' }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAllReview(): Promise<Observable<IReview[]>> {
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
                movieId: { type: 'number', example: 1 },
                review: { type: 'string', example: 'some review' }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/user/:id')
    async getAllReviewByUserId(@Param('id') id: number): Promise<Observable<IReview[]>> {
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
                userId: { type: 'number', example: 1 },
                review: { type: 'string', example: 'some review' }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/movie/:id')
    async getAllReviewByMovieId(@Param('id') id: number): Promise<Observable<IReview[]>> {
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
                userId: { type: 'number', example: 1 },
                movieId: { type: 'number', example: 1 },
                review: { type: 'string', example: 'some review' }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async getOneReviewById(@Param('id') id: number): Promise<Observable<IReview>> {
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
                userId: { type: 'number', example: 1 },
                movieId: { type: 'number', example: 1 },
                review: { type: 'string', example: 'Any review' }
            }
        }
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async updateReview<T>(@Param('id') id: number, @Body() dto: UpdateReviewDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.commentService.send('update.review', { id: id, review: dto.review }));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    private async checkIfErrorCameBackAndSendResponse(response: any, res: Response) {
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
    }
}