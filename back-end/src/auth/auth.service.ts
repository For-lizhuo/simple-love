import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { bcryptConfig } from './config/bcrypt.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async login(loginDto: LoginDto) {
    const { password } = await this.authRepository.findOne({
      where: {
        id: 1,
      },
    });
    const compareRes = await bcrypt.compare(loginDto.password, password);
    if (!compareRes) {
      throw new HttpException(`password error!`, HttpStatus.UNAUTHORIZED);
    }
    const payload = { date: new Date() };
    return {
      access_token: 'Bearer ' + (await this.jwtService.signAsync(payload)),
    };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const salt = await bcrypt.genSalt(bcryptConfig.rounds);
    const hashPassword = await bcrypt.hash(updatePasswordDto.password, salt);
    const newPassword = await this.authRepository.preload({
      id: 1,
      password: hashPassword,
    });
    return this.authRepository.save(newPassword);
  }
}
