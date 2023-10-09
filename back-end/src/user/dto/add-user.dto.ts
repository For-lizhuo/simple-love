import { IsString, Length } from 'class-validator';

export class AddUserDto {
  @IsString()
  @Length(1, 8)
  readonly nickname: string;

  @IsString()
  readonly avatar: string;

  @IsString()
  readonly gender: string;
}
