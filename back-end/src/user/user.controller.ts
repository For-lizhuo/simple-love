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
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserList() {
    return this.userService.getUserList();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Post('')
  addUser(@Body() addUserDto: AddUserDto) {
    return this.userService.addUser(addUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }
}
