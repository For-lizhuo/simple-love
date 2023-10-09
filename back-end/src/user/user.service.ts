import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddUserDto } from './dto/add-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserList() {
    const userList = await this.userRepository.find({
      select: {
        id: true,
        nickname: true,
        avatar: true,
      },
    });
    return userList;
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException(`id ${id} does not exist!`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addUser(addUserDto: AddUserDto) {
    return this.userRepository.save(addUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new HttpException(`id ${id} does not exist!`, HttpStatus.NOT_FOUND);
    }
    return this.userRepository.save(user);
  }

  async removeUser(id: number) {
    return this.userRepository.softDelete({ id: id });
  }
}
