import { Controller, HttpException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewCommentsService } from './review-comments.service';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { UpdateReviewCommentDto } from './dto/update-review-comment.dto';
import { ReviewComment } from './review-comments.model';

@Controller()
export class ReviewCommentsController {
    constructor(private reviewCommentService: ReviewCommentsService) { }

    @MessagePattern('create.review-comment')
    async create(@Payload() dto: CreateReviewCommentDto): Promise<ReviewComment | HttpException> {
        return this.reviewCommentService.create(dto);
    }

    @MessagePattern('get.all.review-comment')
    async getAll(): Promise<ReviewComment[]> {
        return this.reviewCommentService.getAll();
    }


    @MessagePattern('get.review-comment')
    async getOneById(@Payload() id: number): Promise<ReviewComment> {
        return this.reviewCommentService.getOneById(id);
    }

    @MessagePattern('get.all.review-comment.user')
    async getAllByUser(@Payload() id: number): Promise<ReviewComment[]> {
        return this.reviewCommentService.getAllByUser(id);
    }

    @MessagePattern('get.all.review-comment.review')
    async getAllByReview(@Payload() id: number): Promise<ReviewComment[]> {
        return this.reviewCommentService.getAllByReview(id);
    }

    @MessagePattern('remove.review-comment.commentId')
    async removeByCommentId(@Payload() id: number): Promise<number> {
        return this.reviewCommentService.removeByCommentId(id);
    }


    @MessagePattern('remove.review-comment.userId')
    async removeByUserId(@Payload() id: number): Promise<number> {
        return this.reviewCommentService.removeByUserId(id);
    }

    @MessagePattern('update.review-comment')
    async update(@Payload() dto: UpdateReviewCommentDto): Promise<ReviewComment> {
        return this.reviewCommentService.update(dto);
    }

    @MessagePattern('increase.rate.review-comment')
    async increaseRateComment(@Payload() id: number): Promise<ReviewComment> {
        return this.reviewCommentService.increaseRate(id);
    }

    @MessagePattern('decrease.rate.review-comment')
    async decreaseRateComment(@Payload() id: number): Promise<ReviewComment> {
        return this.reviewCommentService.decreaseRate(id);
    }
}
