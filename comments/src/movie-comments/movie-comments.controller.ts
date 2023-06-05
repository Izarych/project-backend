import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMovieCommentDto } from './dto/create-movie-comment.dto';
import { UpdateMovieCommentDto } from './dto/update-movie-comment.dto';
import { MovieCommentsService } from './movie-comments.service';

@Controller()
export class MovieCommentsController {
    constructor(private movieCommentService: MovieCommentsService) { }

    @MessagePattern('create.movie-comment')
    async create(@Payload() dto: CreateMovieCommentDto) {
        return this.movieCommentService.create(dto);
    }

    @MessagePattern('get.all.movie-comment')
    async getAll() {
        return this.movieCommentService.getAll();
    }


    @MessagePattern('get.movie-comment')
    async getOneById(@Payload() id: number) {
        return this.movieCommentService.getOneById(id);
    }

    @MessagePattern('get.all.movie-comment.user')
    async getAllByUser(@Payload() id: number) {
        return this.movieCommentService.getAllByUser(id);
    }

    @MessagePattern('get.all.movie-comment.movie')
    async getAllByMovie(@Payload() id: number) {
        return this.movieCommentService.getAllByMovie(id);
    }

    @MessagePattern('remove.movie-comment.commentId')
    async removeByCommentId(@Payload() id: number) {
        return this.movieCommentService.removeByCommentId(id);
    }


    @MessagePattern('remove.movie-comment.userId')
    async removeByUserId(@Payload() id: number) {
        return this.movieCommentService.removeByUserId(id);
    }

    @MessagePattern('update.movie-comment')
    async update(@Payload() dto: UpdateMovieCommentDto) {
        return this.movieCommentService.update(dto);
    }

    @MessagePattern('increase.rate.movie-comment')
    async increaseRateComment(@Payload() id: number) {
        return this.movieCommentService.increaseRate(id);
    }

    @MessagePattern('decrease.rate.movie-comment')
    async decreaseRateComment(@Payload() id: number) {
        return this.movieCommentService.decreaseRate(id);
    }
}
