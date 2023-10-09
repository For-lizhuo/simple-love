import { IsString, Length, Matches } from 'class-validator';

export class AddAnniversaryDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  readonly date: string;

  @IsString()
  @Length(1, 12)
  readonly detail: string;
}
