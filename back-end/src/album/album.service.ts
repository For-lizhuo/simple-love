import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Album } from './entities/album.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AddAlbumDto } from './dto/add-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => PhotoService))
    private readonly photoService: PhotoService,
  ) {}

  async getAlbumList() {
    const albumList = await this.albumRepository.find({
      relations: {
        photos: true,
      },
    });
    return albumList.map((album) => {
      const quantity = album.photos.length;
      if (quantity > 0) {
        const cover = album.photos[0].source;
        return { ...album, cover, quantity };
      } else {
      }
      return { ...album, cover: null, quantity };
    });
  }

  async getAlbum(id: number) {
    const album = await this.albumRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        photos: true,
      },
    });
    if (!album) {
      throw new HttpException(`id ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async addAlbum(addAlbumDto: AddAlbumDto) {
    const { title } = addAlbumDto;
    const album = await this.albumRepository.findOne({
      where: {
        title: title,
      },
    });
    if (album) {
      throw new HttpException(
        `title '${title}' has been used!`,
        HttpStatus.CONFLICT,
      );
    }
    return this.albumRepository.save(addAlbumDto);
  }

  async updateAlbum(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.preload({
      id: id,
      ...updateAlbumDto,
    });
    if (!album) {
      throw new HttpException(
        `id ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumRepository.save(album);
  }

  async removeAlbum(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { photos } = await this.getAlbum(id);
      if (photos.length > 0) {
        await this.photoService.removePhotos({
          photoIdList: photos.map((photo) => photo.id),
        });
      }
      this.albumRepository.softDelete(id);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
