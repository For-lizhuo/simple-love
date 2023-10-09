import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { DateFormat, TimeFormat } from 'src/common/utils/dateTimeFormat';
import { AddMessageDto } from './dto/add-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  getMessage() {
    return this.messageRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  addMessage(addMessageDto: AddMessageDto) {
    return this.messageRepository.save({
      date: DateFormat(new Date()),
      time: TimeFormat(new Date()),
      ...addMessageDto,
    });
  }

  async removeMessage(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!message) {
      throw new HttpException(
        `id ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.messageRepository.softDelete(id);
  }
}
