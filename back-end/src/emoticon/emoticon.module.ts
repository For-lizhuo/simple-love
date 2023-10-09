import { Module } from '@nestjs/common';
import { Emoticon } from './entities/emoticon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmoticonService } from './emoticon.service';
import { EmoticonController } from './emoticon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Emoticon])],
  providers: [EmoticonService],
  controllers: [EmoticonController],
})
export class EmoticonModule {}
