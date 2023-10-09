import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Anniversary } from './entities/anniversary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAnniversaryDto } from './dto/add-anniversary.dto';

@Injectable()
export class AnniversaryService {
  constructor(
    @InjectRepository(Anniversary)
    private readonly anniversaryRepository: Repository<Anniversary>,
  ) {}

  async getAnniversary() {
    const anniversary = await this.anniversaryRepository.find();
    return anniversary
      .map(({ id, date, detail }) => {
        return { id, date: date.slice(5), detail };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  addAnniversary(addAnniversaryDto: AddAnniversaryDto) {
    return this.anniversaryRepository.save(addAnniversaryDto);
  }

  async removeAnniversary(id: number) {
    const anniversary = await this.anniversaryRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!anniversary) {
      throw new HttpException(
        `id ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.anniversaryRepository.softDelete(id);
  }
}
