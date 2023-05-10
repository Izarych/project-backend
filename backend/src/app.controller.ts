import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AddRoleDto } from "./dto/add-user-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateUserPhoneDto } from "./dto/update-user-phone.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesGuard } from "../guard/roles.guard";
import { Roles } from "../guard/roles-auth.decorator";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy,
        @Inject('PARSE_SERVICE') private parseService: ClientProxy,
        @Inject('COMMENT_SERVICE') private commentService: ClientProxy) { }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    createRole(@Body() dto: CreateRoleDto) {
        return this.userService.send('create.role', dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/parse')
    async parseFilms() {
        return this.parseService.emit('parse', '');
    }

    @Get('/role/:role')
    getByValue(@Param('role') role: string) {
        return this.userService.send('get.role.by.value', role);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/user')
    getAllUsers() {
        return this.userService.send('get.all.users', '');
    }

    @Get('/user/:id')
    getOneByIdUser(@Param('id') id: number) {
        return this.userService.send('get.user.id', id);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/user/addrole/:id')
    addRole(@Param('id') userId: number, @Body() dto: AddRoleDto) {
        return this.userService.send('add.role', { userId, value: dto.value });
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/removerole')
    removeRole(@Body() dto: AddRoleDto) {
        return this.userService.send('remove.role', dto);
    }

    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/user/password')
    updatePassword(@Body() dto: UpdateUserDto) {
        return this.userService.send('update.user', dto);
    }

    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/user/phone')
    updatePhoneNumber(@Body() dto: UpdateUserPhoneDto) {
        return this.userService.send('update.user.phone', dto);
    }

    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/:id')
    deleteUser(@Param('id') id: number) {
        return this.userService.send('delete.user', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Post('/comment')
    createComment(@Body() dto: CreateCommentDto) {
        return this.commentService.send('create.comment', dto);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/comment/increase_rate/:id')
    increaseRateComment(@Param('id') id: number) {
        return this.commentService.send('increase.rate.comment', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/comment/decrease_rate/:id')
    decreaseRateComment(@Param('id') id: number) {
        return this.commentService.send('decrease.rate.comment', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/comment')
    getAllComment() {
        return this.commentService.send('get.all.comment', '');
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/comment/user/:id')
    getAllCommentByUser(@Param('id') id: number) {
        return this.commentService.send('get.all.comment.user', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/comment/review/:id')
    getAllCommentByReview(@Param('id') id: number) {
        return this.commentService.send('get.all.comment.review', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/comment/:id')
    getOneByIdComment(@Param('id') id: number) {
        return this.commentService.send('get.comment', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Put('/comment')
    updateComment(@Body() dto: UpdateUserDto) {
        return this.commentService.send('update.comment', dto);
    }

    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Delete('/comment/user/:id')
    removeCommentByUserId(@Param('id') id: number) {
        return this.commentService.send('remove.comment.userId', id);
    }

    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Delete('/comment/:id')
    removeCommentByCommentId(@Param('id') id: number) {
        return this.commentService.send('remove.comment.commentId', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/review/increase_rate/:id')
    increaseRateReview(@Param('id') id: number) {
        return this.commentService.send('increase.rate.review', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/review/decrease_rate/:id')
    decreaseRateReview(@Param('id') id: number) {
        return this.commentService.send('decrease.rate.review', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Post('/review')
    createReview(@Body() dto: CreateReviewDto) {
        return this.commentService.send('create.review', dto);
    }

    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Delete('/review/user/:id')
    removeReviewByUserId(@Param('id') id: number) {
        return this.commentService.send('remove.review.userId', id);
    }

    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Delete('/review/:id')
    removeReviewByReviewId(@Param('id') id: number) {
        return this.commentService.send('remove.review.reviewId', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/review')
    getAllReview() {
        return this.commentService.send('get.all.review', '');
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/review/user/:id')
    getAllReviewByUserId(@Param('id') id: number) {
        return this.commentService.send('get.all.review.user', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/review/movie/:id')
    getAllReviewByMovieId(@Param('id') id: number) {
        return this.commentService.send('get.all.review.movie', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Get('/review/:id')
    getOneReviewById(@Param('id') id: number) {
        return this.commentService.send('get.review', id);
    }

    // @Roles('USER', 'ADMIN')
    // @UseGuards(RolesGuard)
    @Put('/review')
    updateReview(@Body() dto: UpdateReviewDto) {
        return this.commentService.send('update.review', dto);
    }
}