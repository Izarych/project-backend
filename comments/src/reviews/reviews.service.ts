import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './reviews.model';

@Injectable()
export class ReviewsService {
    constructor(@InjectModel(Review) private reviewRepository: typeof Review) { }

    async create(dto: CreateReviewDto) {
        const review = await this.reviewRepository.create(dto);
        return review;
    }

    async removeOneById(id: number) {
        return await this.reviewRepository.destroy({ where: { id: id } });
    }

    async removeAllByUserId(id: number) {
        return await this.reviewRepository.destroy({ where: { userId: id } });
    }

    async getAll() {
        return await this.reviewRepository.findAll({
            include: { all: true }
        });
    }

    async getByMovieId(id: number) {
        return await this.reviewRepository.findAll({ where: { movieId: id } });
    }

    async getByUserId(id: number) {
        return await this.reviewRepository.findAll({ where: { userId: id } });
    }

    async getOneById(id: number) {
        return await this.reviewRepository.findByPk(id);
    }

    async update(dto: UpdateReviewDto) {
        return await this.reviewRepository.update(dto, { where: { id: dto.reviewId } });
    }
}
