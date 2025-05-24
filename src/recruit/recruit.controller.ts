import { Controller, Put, Get, Post, Delete, Param, Query, Body, UseGuards , Request} from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { Recruit } from '@prisma/client'; 
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Recruit')
@Controller('recruit')
export class RecruitController {
  constructor(private readonly postService: RecruitService) {}

  @Get()
  @ApiOperation({summary:'모집글 조회', description: '모든 모집글 정보를 불러옵니다.'})
  getAll(): Promise<Recruit[]> {
    return this.postService.getAll();
  }

  @Post()
  @ApiOperation({summary:'모집글 생성', description: '모집글을 생성합니다.'})
  create(): Promise<Recruit[]> {
    return this.postService.getAll();
  }
}