import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Recruit } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RecruitDto } from './dto/recruit.dto';

@Injectable()
export class RecruitService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Recruit[]> {
    return this.prisma.recruit.findMany({
      include: {}
    });
  }

  async create(data: RecruitDto): Promise<Recruit> {
    return this.prisma.recruit.create({
      data: {
        sport: data.sport,
        description: data.description,
      },
    });
  }
}