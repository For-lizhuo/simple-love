import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AddMessageDto } from './dto/add-message.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getMessage() {
    return this.messageService.getMessage();
  }

  @Post()
  addMessage(@Body() addMessageDto: AddMessageDto) {
    return this.messageService.addMessage(addMessageDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeMessage(@Param('id') id: number) {
    return this.messageService.removeMessage(id);
  }
}
