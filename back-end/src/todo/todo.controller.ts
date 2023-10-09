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
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodo() {
    return this.todoService.getTodo();
  }

  @UseGuards(AuthGuard)
  @Post()
  addTodo(@Body() addTodoDto: AddTodoDto) {
    return this.todoService.addTodo(addTodoDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeTodo(@Param('id') id: number) {
    return this.todoService.removeTodo(id);
  }
}
