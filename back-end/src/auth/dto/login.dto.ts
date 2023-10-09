import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(4, 12)
  readonly password: string;
}
