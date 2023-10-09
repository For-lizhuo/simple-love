import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AddAlbumDto } from './dto/add-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbumList() {
    return this.albumService.getAlbumList();
  }

  @Get(':id')
  getAlbum(@Param('id') id: number) {
    return this.albumService.getAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  addAlbum(@Body() addAlbumDto: AddAlbumDto) {
    return this.albumService.addAlbum(addAlbumDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateAlbum(@Param('id') id: number, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeAlbum(@Param('id') id: number) {
    return this.albumService.removeAlbum(id);
  }
}
