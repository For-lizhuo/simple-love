import { IsString, Length } from 'class-validator';

export class AddMessageDto {
  @IsString()
  @Length(1, 100)
  readonly detail: string;
}
