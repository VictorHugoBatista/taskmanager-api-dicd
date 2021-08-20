import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';

export class UpdateTaskRequest {
  @ApiProperty()
  @IsString()
  @ValidateIf(
    (req: UpdateTaskRequest) =>
      !req.description || typeof req.description !== 'string',
  )
  title: string;

  @ApiProperty()
  @IsString()
  @ValidateIf(
    (req: UpdateTaskRequest) => !req.title || typeof req.title !== 'string',
  )
  description: string;
}
