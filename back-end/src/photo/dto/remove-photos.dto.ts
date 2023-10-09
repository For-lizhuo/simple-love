import { IsArray, IsNumber } from 'class-validator';

export class RemovePhotosDto {
  @IsArray()
  @IsNumber({}, { each: true })
  readonly photoIdList: number[];
}
