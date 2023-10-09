import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AnniversaryService } from './anniversary.service';
import { AddAnniversaryDto } from './dto/add-anniversary.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('anniversary')
export class AnniversaryController {
  constructor(private readonly anniversaryService: AnniversaryService) {}

  @Get()
  getAnniversary() {
    return this.anniversaryService.getAnniversary();
  }

  @UseGuards(AuthGuard)
  @Post()
  addAnniversary(@Body() addAnniversaryDto: AddAnniversaryDto) {
    return this.anniversaryService.addAnniversary(addAnniversaryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeAnniversary(@Param('id') id: number) {
    return this.anniversaryService.removeAnniversary(id);
  }
}
