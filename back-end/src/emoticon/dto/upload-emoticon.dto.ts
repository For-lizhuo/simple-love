import { IsArray, IsString } from 'class-validator';

export class UploadEmoticonsDto {
  @IsArray()
  @IsString({ each: true })
  readonly sources: string[];
}
