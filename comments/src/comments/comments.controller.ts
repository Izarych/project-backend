import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentsController {
    constructor(private commentService: CommentsService) { }

    @MessagePattern('create.comment')
    create(@Payload() dto: CreateCommentDto) {
        return this.commentService.create(dto);
    }

    @MessagePattern('get.all.comment')
    getAll() {
        return this.commentService.getAll();
    }


    @MessagePattern('get.comment')
    getOneById(@Payload() id: number) {
        return this.commentService.getOneById(id);
    }

    @MessagePattern('get.all.comment.user')
    getAllByUser(@Payload() id: number) {
        return this.commentService.getAllByUser(id);
    }

    @MessagePattern('get.all.comment.review')
    getAllByReview(@Payload() id: number) {
        return this.commentService.getAllByReview(id);
    }

    @MessagePattern('remove.comment.commentId')
    removeByCommentId(@Payload() id: number) {
        return this.commentService.removeByCommentId(id);
    }


    @MessagePattern('remove.comment.userId')
    removeByUserId(@Payload() id: number) {
        return this.commentService.removeByUserId(id);
    }

    @MessagePattern('update.comment')
    update(@Payload() dto: UpdateCommentDto) {
        return this.commentService.update(dto);
    }
}
