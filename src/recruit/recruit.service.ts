import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Recruit } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecruitService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Recruit[]> {
    return this.prisma.recruit.findMany({
      include: {}
    });
  }
}