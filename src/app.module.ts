import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecruitModule } from './recruit/recruit.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), RecruitModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}