/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto, LoginExternalDto } from 'src/modules/users/dto/loginUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth usuarios')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    // console.log(loginDto)
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-external')
  signInExternal(@Body() loginExternalDto: LoginExternalDto) {
    return this.authService.signInExternal(loginExternalDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req ) {
    return req.user;
  }
}
