import { IsArray, IsNumber, IsString } from 'class-validator';

export class UploadPhotosDto {
  @IsArray()
  @IsString({ each: true })
  readonly sources: string[];

  @IsNumber()
  readonly albumId: number;
}
