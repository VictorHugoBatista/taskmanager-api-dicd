import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskRequest } from '../contracts/requests/create-task-request';
import { TaskRepository } from '../repositories/task.repository';

import { Task } from '../contracts/entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskRequest })
  @ApiTags('Tasks')
  create(@Body() body: CreateTaskRequest) {
    return this.taskRepository.create(body as Task);
  }
}
