import { Controller, Post, Body, Request, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({summary:'로그인', description: '이메일과 비밀번호를 통해 로그인합니다.'})
  async login(@Body() userDto: UserDto) {
    const user = await this.authService.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new NotFoundException('User not found or incorrect password.');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({summary:'회원가입', description: '회원가입을 합니다.'})
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }
}