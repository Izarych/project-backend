import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) { }

    async create(dto: CreateCommentDto) {
        try {
            const comment = await this.commentRepository.create(dto);
            return comment;
        } catch (error) {
            return error.parent;
        }
    }

    async getAll() {
        return await this.commentRepository.findAll();
    }

    async getOneById(id: number) {
        return await this.commentRepository.findByPk(id);
    }

    async getAllByUser(id: number) {
        return await this.commentRepository.findAll({ where: { userId: id } });
    }

    async getAllByReview(id: number) {
        return await this.commentRepository.findAll({ where: { reviewId: id } });
    }

    async removeByCommentId(id: number) {
        return await this.commentRepository.destroy({ where: { id: id } });
    }


    async removeByUserId(id: number) {
        return await this.commentRepository.destroy({ where: { userId: id } });
    }

    async update(dto: UpdateCommentDto) : Promise<Comment> {
        const comment = await this.commentRepository.findByPk(dto.id);
        return await comment.update(dto);
    }

    async increaseRate(id: number) {
        return await this.changeRate(id, 'increase');
    }

    async decreaseRate(id: number) {
        return await this.changeRate(id, 'decrease');
    }

    private async changeRate(id: number, operation: string) {
        const comment = await this.getOneById(id);
        if (!comment) {
            return new HttpException(`Comment with "${id}" ID not found`, HttpStatus.NOT_FOUND);
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
