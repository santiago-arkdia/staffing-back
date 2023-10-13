import { Controller, Get, Param } from '@nestjs/common';
import { GetAllUsersService } from './get-all-users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Get all Users')
@Controller('getAllUsers')
export class GetAllUsersController {
  constructor(private readonly userService: GetAllUsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':page-:limit')
  getUsersByPage(@Param('page') page: number, @Param('limit') limit: number) {
    return this.userService.getUsersByPage(page, limit);
  }
}
