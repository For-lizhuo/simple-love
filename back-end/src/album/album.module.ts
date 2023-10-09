import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import {} from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => PhotoModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
