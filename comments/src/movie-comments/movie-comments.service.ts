import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMovieCommentDto } from './dto/create-movie-comment.dto';
import { UpdateMovieCommentDto } from './dto/update-movie-comment.dto';
import { MovieComment } from './movie-comments.model';

@Injectable()
export class MovieCommentsService {
    constructor(@InjectModel(MovieComment) private commentRepository: typeof MovieComment) { }

    async create(dto: CreateMovieCommentDto): Promise<MovieComment> {
        return await this.commentRepository.create(dto);
    }

    async getAll(): Promise<MovieComment[]> {
        return await this.commentRepository.findAll();
    }

    async getOneById(id: number): Promise<MovieComment> {
        return await this.commentRepository.findByPk(id);
    }

    async getAllByUser(id: number): Promise<MovieComment[]> {
        return await this.commentRepository.findAll({ where: { userId: id } });
    }

    async getAllByMovie(id: number): Promise<MovieComment[]> {
        return await this.commentRepository.findAll({ where: { movieId: id } });
    }

    async removeByCommentId(id: number): Promise<number> {
        return await this.commentRepository.destroy({ where: { id: id } });
    }


    async removeByUserId(id: number): Promise<number> {
        return await this.commentRepository.destroy({ where: { userId: id } });
    }

    async update(dto: UpdateMovieCommentDto): Promise<MovieComment> {
        const comment: MovieComment = await this.commentRepository.findByPk(dto.id);
        return await comment.update(dto);
    }

    async increaseRate(id: number): Promise<MovieComment | HttpException> {
        try {
            return await this.changeRate(id, 'increase');
        } catch (error) {
            return new HttpException(error.response, error.status, { cause: error });
        }

    }

    async decreaseRate(id: number): Promise<MovieComment | HttpException> {
        try {
            return await this.changeRate(id, 'decrease');
        } catch (error) {
            return new HttpException(error.response, error.status, { cause: error });
        }

    }

    private async changeRate(id: number, operation: string): Promise<MovieComment> {
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
