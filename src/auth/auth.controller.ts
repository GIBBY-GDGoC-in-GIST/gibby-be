import { Controller, Post, Body, Request, UseGuards, NotFoundException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 정보 조회', description: '로그인한 유저의 정보를 조회합니다.',})
  async profile(@Request() req: any) {
    return this.authService.findUserProfile(req.user.email);
  }


}