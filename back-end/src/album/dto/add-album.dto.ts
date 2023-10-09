import { IsBoolean, IsString, Length } from 'class-validator';

export class AddAlbumDto {
  @IsString()
  @Length(1, 12)
  readonly title: string;

  @IsBoolean()
  readonly privacy: boolean;
}
