import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmoticonService } from './emoticon.service';
import { UploadEmoticonsDto } from './dto/upload-emoticon.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('emoticon')
export class EmoticonController {
  constructor(private readonly emoticonService: EmoticonService) {}

  @Get()
  getEmoticon() {
    return this.emoticonService.getEmoticon();
  }

  @UseGuards(AuthGuard)
  @Post()
  uploadEmoticons(@Body() uploadEmoticonsDto: UploadEmoticonsDto) {
    return this.emoticonService.uploadEmoticons(uploadEmoticonsDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeEmoticon(@Param('id') id: number) {
    return this.emoticonService.removeEmoticon(id);
  }
}
