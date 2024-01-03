/* eslint-disable prettier/prettier */
import {Body, Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import {GetAllUsersService} from '../services/get-all-users.service';
import {ApiTags} from '@nestjs/swagger';
import {UserDto} from '../dto/filter-user.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@ApiTags('Get all Users')
@Controller('api/get-all-users')
export class GetAllUsersController {
    constructor(private readonly userService: GetAllUsersService) {
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    /*@Get(':page/:limit')
    getUsersByPage(@Param('page') page: number, @Param('limit') limit: number) {
        return this.userService.getUsersByPage(page, limit);
    }


    @Get(':page/:limit/:filter')
    getUsersByPageFilterDocumentName(@Param('page') page: number, @Param('limit') limit: number, @Param('filter') filter: string) {
        return this.userService.getUsersByPageFilterDocumentName(page, limit, filter);
    }


    @Post('filters/:page/:limit')
    getUsersByFilters(@Param('page') page: number, @Param('limit') limit: number, @Body() user: UserDto) {
        if (user && Object.keys(user).length > 0) {
            return this.userService.getUsersByFilters(page, limit, user);
        } else {
            return this.userService.getUsersByPage(page, limit);
        }
    }*/

    @Get(':page/:limit')
    @UseGuards(AuthGuard)
    async findBy(
        @Param('page') page: number,
        @Param('limit') limit: number,
        @Body() user: UserDto,
        @Req() request: Request
    ): Promise<UserDto[]> {
        const { roleKey } = request['user'];
        return await this.userService.findBy(page, limit, user, roleKey);
    }
}
