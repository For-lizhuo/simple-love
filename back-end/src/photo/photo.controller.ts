import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { UploadPhotosDto } from './dto/upload-photos.dto';
import { RemovePhotosDto } from './dto/remove-photos.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get(':id')
  getPhoto(@Param('id') id: number) {
    return this.photoService.getPhoto(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  uploadPhotos(@Body() uploadPhotosDto: UploadPhotosDto) {
    return this.photoService.uploadPhotos(uploadPhotosDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  removePhotos(@Body() removePhotosDto: RemovePhotosDto) {
    return this.photoService.removePhotos(removePhotosDto);
  }
}
