import { IsString } from 'class-validator';

export class CreateTaskRequest {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
