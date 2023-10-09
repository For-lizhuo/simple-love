import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emoticon } from './entities/emoticon.entity';
import { Repository } from 'typeorm';
import { UploadEmoticonsDto } from './dto/upload-emoticon.dto';
import { Random } from 'random-js';

@Injectable()
export class EmoticonService {
  constructor(
    @InjectRepository(Emoticon)
    private readonly emoticonRepository: Repository<Emoticon>,
  ) {}
  async getEmoticon() {
    const emoticons = await this.emoticonRepository.find({
      select: {
        id: true,
        source: true,
      },
    });
    if (emoticons.length === 0) {
      throw new HttpException(`emoticon does not exist`, HttpStatus.NOT_FOUND);
    }
    const random = new Random();
    const value = random.integer(1, emoticons.length);
    return emoticons[value - 1];
  }

  async uploadEmoticons(uploadEmoticonsDto: UploadEmoticonsDto) {
    const { sources } = uploadEmoticonsDto;
    for (const source of sources) {
      await this.emoticonRepository.save({ source });
    }
    return;
  }

  removeEmoticon(id: number) {
    return this.emoticonRepository.softDelete(id);
  }
}
