import { IsString, Length } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @Length(10)
  completeDate: string;
}
