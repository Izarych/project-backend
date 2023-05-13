import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentsController {
    constructor(private commentService: CommentsService) { }

    @MessagePattern('create.comment')
    async create(@Payload() dto: CreateCommentDto) {
        return this.commentService.create(dto);
    }

    @MessagePattern('get.all.comment')
    async getAll() {
        return this.commentService.getAll();
    }


    @MessagePattern('get.comment')
    async getOneById(@Payload() id: number) {
        return this.commentService.getOneById(id);
    }

    @MessagePattern('get.all.comment.user')
    async getAllByUser(@Payload() id: number) {
        return this.commentService.getAllByUser(id);
    }

    @MessagePattern('get.all.comment.review')
    async getAllByReview(@Payload() id: number) {
        return this.commentService.getAllByReview(id);
    }

    @MessagePattern('remove.comment.commentId')
    async removeByCommentId(@Payload() id: number) {
        return this.commentService.removeByCommentId(id);
    }


    @MessagePattern('remove.comment.userId')
    async removeByUserId(@Payload() id: number) {
        return this.commentService.removeByUserId(id);
    }

    @MessagePattern('update.comment')
    async update(@Payload() dto: UpdateCommentDto) {
        return this.commentService.update(dto);
    }

    @MessagePattern('increase.rate.comment')
    async increaseRateComment(@Payload() id: number) {
        return this.commentService.increaseRate(id);
    }

    @MessagePattern('decrease.rate.comment')
    async decreaseRateComment(@Payload() id: number) {
        return this.commentService.decreaseRate(id);
    }
}
