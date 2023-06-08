import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewComment } from './review-comments.model';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { UpdateReviewCommentDto } from './dto/update-review-comment.dto';

@Injectable()
export class ReviewCommentsService {
    constructor(@InjectModel(ReviewComment) private commentRepository: typeof ReviewComment) { }

    async create(dto: CreateReviewCommentDto): Promise<ReviewComment | HttpException> {
        try {
            return await this.commentRepository.create(dto);
        } catch (error) {
            return new HttpException(`Review with ${dto.reviewId} ID does not exist`, HttpStatus.BAD_REQUEST, { cause: error });
        }
    }

    async getAll(): Promise<ReviewComment[]> {
        return await this.commentRepository.findAll();
    }

    async getOneById(id: number): Promise<ReviewComment> {
        return await this.commentRepository.findByPk(id);
    }

    async getAllByUser(id: number): Promise<ReviewComment[]> {
        return await this.commentRepository.findAll({ where: { userId: id } });
    }

    async getAllByReview(id: number): Promise<ReviewComment[]> {
        return await this.commentRepository.findAll({ where: { reviewId: id } });
    }

    async removeByCommentId(id: number): Promise<number> {
        return await this.commentRepository.destroy({ where: { id: id } });
    }


    async removeByUserId(id: number): Promise<number> {
        return await this.commentRepository.destroy({ where: { userId: id } });
    }

    async update(dto: UpdateReviewCommentDto): Promise<ReviewComment> {
        const comment: ReviewComment = await this.commentRepository.findByPk(dto.id);
        return await comment.update(dto);
    }

    async increaseRate(id: number): Promise<ReviewComment | HttpException> {
        try {
            return await this.changeRate(id, 'increase');
        } catch (error) {
            return new HttpException(error.response, error.status, { cause: error });
        }

    }

    async decreaseRate(id: number): Promise<ReviewComment | HttpException> {
        try {
            return await this.changeRate(id, 'decrease');
        } catch (error) {
            return new HttpException(error.response, error.status, { cause: error });
        }

    }

    private async changeRate(id: number, operation: string): Promise<ReviewComment> {
        const comment = await this.getOneById(id);
        if (!comment) {
            throw new HttpException(`Comment with "${id}" ID not found`, HttpStatus.NOT_FOUND);
        }
        if (operation == 'increase') {
            comment.rate = comment.rate + 1;
        } else if (operation == 'decrease') {
            comment.rate = comment.rate - 1;
        }
        await comment.save();
        return comment;
    }
}
