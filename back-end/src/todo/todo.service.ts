import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  getTodo() {
    return this.todoRepository.find();
  }

  getTodoByComplete(complete: boolean) {
    return this.todoRepository.find({
      where: {
        complete: complete,
      },
    });
  }

  addTodo(addTodoDto: AddTodoDto) {
    return this.todoRepository.save(addTodoDto);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    console.log(updateTodoDto);
    const todo = await this.todoRepository.preload({
      id: id,
      ...updateTodoDto,
      complete: true,
    });
    if (!todo) {
      throw new HttpException(
        `id ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(todo);
    return this.todoRepository.save(todo);
  }

  async removeTodo(id: number) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!todo) {
      throw new HttpException(
        `id ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.todoRepository.softDelete(id);
  }
}
