import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UploadPhotosDto } from './dto/upload-photos.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { AlbumService } from 'src/album/album.service';
import { RemovePhotosDto } from './dto/remove-photos.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  async getPhoto(id: number) {
    const photo = await this.photoRepository.findOne({ where: { id: id } });
    if (!photo) {
      throw new HttpException(`id ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    return photo;
  }

  async uploadPhotos(uploadPhotosDto: UploadPhotosDto) {
    const { albumId, sources } = uploadPhotosDto;
    const album = await this.albumService.getAlbum(albumId);
    let photo: Photo;
    for (const source of sources) {
      photo = new Photo();
      photo.album = album;
      photo.source = source;
      await this.photoRepository.save(photo);
    }
    return;
  }
  removePhotos(removePhotosDto: RemovePhotosDto) {
    const { photoIdList } = removePhotosDto;
    return this.photoRepository.softDelete(photoIdList);
  }
}
