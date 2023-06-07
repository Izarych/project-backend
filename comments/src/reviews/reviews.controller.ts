import { Controller, HttpException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './reviews.model';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
    constructor(private reviewService: ReviewsService) { }

    @MessagePattern('create.review')
    async create(@Payload() dto: CreateReviewDto): Promise<Review | HttpException> {
        return this.reviewService.create(dto);
    }

    @MessagePattern('remove.review.reviewId')
    async removeByReviewId(@Payload() id: number): Promise<number> {
        return this.reviewService.removeOneById(id);
    }

    @MessagePattern('remove.review.userId')
    async removeByUserId(@Payload() id: number): Promise<number> {
        return this.reviewService.removeAllByUserId(id);
    }

    @MessagePattern('get.all.review')
    async getAll(): Promise<Review[]> {
        return this.reviewService.getAll();
    }

    @MessagePattern('get.all.review.user')
    async getAllByUserId(@Payload() userId: number): Promise<Review[]> {
        return this.reviewService.getByUserId(userId);
    }

    @MessagePattern('get.all.review.movie')
    async getAllByMovieId(@Payload() movieId: number): Promise<Review[]> {
        return this.reviewService.getByMovieId(movieId);
    }

    @MessagePattern('get.review')
    async getOneById(@Payload() id: number): Promise<Review> {
        return this.reviewService.getOneById(id);
    }

    @MessagePattern('update.review')
    async update(@Payload() dto: UpdateReviewDto): Promise<Review> {
        return this.reviewService.update(dto);
    }

    @MessagePattern('increase.rate.review')
    async increaseRateReview(@Payload() id: number): Promise<Review> {
        return this.reviewService.increaseRate(id);
    }

    @MessagePattern('decrease.rate.review')
    async decreaseRateReview(@Payload() id: number): Promise<Review> {
        return this.reviewService.decreaseRate(id);
    }
}
