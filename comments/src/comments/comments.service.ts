import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) { }

    async create(dto: CreateCommentDto) {
        const comment = await this.commentRepository.create(dto);
        return comment;
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

    async update(dto: UpdateCommentDto) {
        return await this.commentRepository.update(dto, { where: { id: dto.id } });
    }
}
