import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
    constructor(private reviewService: ReviewsService) { }

    @MessagePattern('create.review')
    create(@Payload() dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }

    @MessagePattern('remove.review.reviewId')
    removeByReviewId(@Payload() id: number) {
        return this.reviewService.removeOneById(id);
    }

    @MessagePattern('remove.review.userId')
    removeByUserId(@Payload() id: number) {
        return this.reviewService.removeAllByUserId(id);
    }

    @MessagePattern('get.all.review')
    getAll() {
        return this.reviewService.getAll();
    }

    @MessagePattern('get.all.review.user')
    getAllByUserId(@Payload() userId: number) {
        return this.reviewService.getByUserId(userId);
    }

    @MessagePattern('get.all.review.movie')
    getAllByMovieId(@Payload() movieId: number) {
        return this.reviewService.getByMovieId(movieId);
    }

    @MessagePattern('get.review')
    getOneById(@Payload() id: number) {
        return this.reviewService.getOneById(id);
    }

    @MessagePattern('update.review')
    update(@Payload() dto: UpdateReviewDto) {
        return this.reviewService.update(dto);
    }

    @MessagePattern('increase.rate.review')
    increaseRateReview(@Payload() id: number) {
        return this.reviewService.increaseRate(id);
    }

    @MessagePattern('decrease.rate.review')
    decreaseRateReview(@Payload() id: number) {
        return this.reviewService.decreaseRate(id);
    }
}
