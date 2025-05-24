import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RecruitDto {
    @IsString()
    @ApiProperty({description:'모임 이름', default: 'Soccer'})
    sport: string;

    @IsString()
    @ApiProperty({description:'모임 설명', default: 'Playing Soccer'})
    description: string;
}