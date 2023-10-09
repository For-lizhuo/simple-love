import { Module } from '@nestjs/common';
import { AnniversaryService } from './anniversary.service';
import { AnniversaryController } from './anniversary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anniversary } from './entities/anniversary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anniversary])],
  providers: [AnniversaryService],
  controllers: [AnniversaryController],
})
export class AnniversaryModule {}
