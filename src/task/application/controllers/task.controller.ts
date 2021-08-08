import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskRequest } from '../../domain/requests/create-task-request';

@Controller('task')
export class TaskController {
  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskRequest })
  @ApiTags('Tasks')
  create(@Body() body: CreateTaskRequest) {
    // salva
    // retorna resultado
    return body;
  }
}
