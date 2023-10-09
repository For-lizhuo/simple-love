import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class AddTodoDto {
  @IsString()
  @Length(1, 20)
  readonly detail: string;

  @IsBoolean()
  @IsOptional()
  readonly complete: boolean;

  @IsString()
  @Length(10)
  @IsOptional()
  readonly completeDate: string;
}
