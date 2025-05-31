import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: userDto.name!,
        email: userDto.email,
        password: hashedPassword,
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async findUserProfile(e: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: e },
      select: {
        email: true,
        name: true,
        createdAt: true, 
      },
    });
    return user;
  }

  async updateUserProfile(e: string, userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.prisma.user.update({
      where: { email: e }, 
      data: {
        name: userDto.name!,
        password: hashedPassword,
      }, 
      select: { 
        email: true,
        createdAt: true,
        name: true,
      }
    });

    if (!user) {
      throw new NotFoundException(`User with email: ${e} not found.`);
    }
    return user;
  }
}