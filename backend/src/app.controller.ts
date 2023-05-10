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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Gateway App')
@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy,
        @Inject('PARSE_SERVICE') private parseService: ClientProxy,
        @Inject('COMMENT_SERVICE') private commentService: ClientProxy) { }

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    createRole(@Body() dto: CreateRoleDto) {
        return this.userService.send('create.role', dto);
    }

    @ApiOperation({ summary: 'Parse data from kinopoisk' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/parse')
    async parseFilms() {
        return this.parseService.emit('parse', '');
    }

    @ApiOperation({ summary: 'Get role by value' })
    @ApiResponse({ status: 200 })
    @Get('/role/:role')
    getByValue(@Param('role') role: string) {
        return this.userService.send('get.role.by.value', role);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/user')
    getAllUsers() {
        return this.userService.send('get.all.users', '');
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200 })
    @Get('/user/:id')
    getOneByIdUser(@Param('id') id: number) {
        return this.userService.send('get.user.id', id);
    }

    @ApiOperation({ summary: 'Add role to user by id' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/user/addrole/:id')
    addRole(@Param('id') userId: number, @Body() dto: AddRoleDto) {
        return this.userService.send('add.role', { userId, value: dto.value });
    }

    @ApiOperation({ summary: 'Remove role to user by id' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/removerole')
    removeRole(@Body() dto: AddRoleDto) {
        return this.userService.send('remove.role', dto);
    }

    @ApiOperation({ summary: 'Change user`s password' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/user/password')
    updatePassword(@Body() dto: UpdateUserDto) {
        return this.userService.send('update.user', dto);
    }

    @ApiOperation({ summary: 'Add/change user`s phonenumber' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/user/phone')
    updatePhoneNumber(@Body() dto: UpdateUserPhoneDto) {
        return this.userService.send('update.user.phone', dto);
    }

    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/:id')
    deleteUser(@Param('id') id: number) {
        return this.userService.send('delete.user', id);
    }

    @ApiOperation({ summary: 'Create comment' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post('/comment')
    createComment(@Body() dto: CreateCommentDto) {
        return this.commentService.send('create.comment', dto);
    }

    @ApiOperation({ summary: 'Increase "likes" to comment by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/comment/increase_rate/:id')
    increaseRateComment(@Param('id') id: number) {
        return this.commentService.send('increase.rate.comment', id);
    }

    @ApiOperation({ summary: 'Decrease "likes" to comment by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/comment/decrease_rate/:id')
    decreaseRateComment(@Param('id') id: number) {
        return this.commentService.send('decrease.rate.comment', id);
    }

    @ApiOperation({ summary: 'Get all comments' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/comment')
    getAllComment() {
        return this.commentService.send('get.all.comment', '');
    }

    @ApiOperation({ summary: 'Get all comments by user id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/comment/user/:id')
    getAllCommentByUser(@Param('id') id: number) {
        return this.commentService.send('get.all.comment.user', id);
    }

    @ApiOperation({ summary: 'Get all comments by review id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/comment/review/:id')
    getAllCommentByReview(@Param('id') id: number) {
        return this.commentService.send('get.all.comment.review', id);
    }

    @ApiOperation({ summary: 'Get comment by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/comment/:id')
    getOneByIdComment(@Param('id') id: number) {
        return this.commentService.send('get.comment', id);
    }

    @ApiOperation({ summary: 'Change comment by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/comment')
    updateComment(@Body() dto: UpdateUserDto) {
        return this.commentService.send('update.comment', dto);
    }

    @ApiOperation({ summary: 'Delete all comments by user id' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/comment/user/:id')
    removeCommentByUserId(@Param('id') id: number) {
        return this.commentService.send('remove.comment.userId', id);
    }

    @ApiOperation({ summary: 'Delete comment by id' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/comment/:id')
    removeCommentByCommentId(@Param('id') id: number) {
        return this.commentService.send('remove.comment.commentId', id);
    }

    @ApiOperation({ summary: 'Increase "likes" to review by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/increase_rate/:id')
    increaseRateReview(@Param('id') id: number) {
        return this.commentService.send('increase.rate.review', id);
    }

    @ApiOperation({ summary: 'Decrease "likes" to review by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/decrease_rate/:id')
    decreaseRateReview(@Param('id') id: number) {
        return this.commentService.send('decrease.rate.review', id);
    }

    @ApiOperation({ summary: 'Create review' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Post('/review')
    createReview(@Body() dto: CreateReviewDto) {
        return this.commentService.send('create.review', dto);
    }

    @ApiOperation({ summary: 'Delete all review by user id' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/review/user/:id')
    removeReviewByUserId(@Param('id') id: number) {
        return this.commentService.send('remove.review.userId', id);
    }

    @ApiOperation({ summary: 'Delete review by id' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/review/:id')
    removeReviewByReviewId(@Param('id') id: number) {
        return this.commentService.send('remove.review.reviewId', id);
    }

    @ApiOperation({ summary: 'Get all reviews' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review')
    getAllReview() {
        return this.commentService.send('get.all.review', '');
    }

    @ApiOperation({ summary: 'Get all reviews by user id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/user/:id')
    getAllReviewByUserId(@Param('id') id: number) {
        return this.commentService.send('get.all.review.user', id);
    }

    @ApiOperation({ summary: 'Get all reviews by movie id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/movie/:id')
    getAllReviewByMovieId(@Param('id') id: number) {
        return this.commentService.send('get.all.review.movie', id);
    }

    @ApiOperation({ summary: 'Get review by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Get('/review/:id')
    getOneReviewById(@Param('id') id: number) {
        return this.commentService.send('get.review', id);
    }

    @ApiOperation({ summary: 'Change review by id' })
    @ApiResponse({ status: 200 })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/review')
    updateReview(@Body() dto: UpdateReviewDto) {
        return this.commentService.send('update.review', dto);
    }
}