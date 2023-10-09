import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @Length(4, 12)
  readonly password: string;
}
