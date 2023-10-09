import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(1, 8)
  @IsOptional()
  readonly nickname: string;

  @IsString()
  @IsOptional()
  readonly avatar: string;
}
