import { Module, forwardRef } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), forwardRef(() => AlbumModule)],
  providers: [PhotoService],
  controllers: [PhotoController],
  exports: [PhotoService],
})
export class PhotoModule {}
