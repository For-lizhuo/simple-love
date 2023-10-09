import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @Length(1, 12)
  @IsOptional()
  readonly title: string;

  @IsBoolean()
  @IsOptional()
  readonly privacy: boolean;
}
