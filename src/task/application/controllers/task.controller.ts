import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskRequest } from '../contracts/requests/create-task-request';
import { TaskRepository } from '../../domain/repositories/task.repository';

import { Task } from '../contracts/entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskRepository: TaskRepository) {}

  @Get()
  @ApiOperation({ summary: 'List all the tasks' })
  @ApiTags('Tasks')
  public index() {
    return this.taskRepository.list();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiTags('Tasks')
  public show(@Param('id') id: number) {
    return { test: id };
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskRequest })
  @ApiTags('Tasks')
  public create(@Body() body: CreateTaskRequest) {
    return this.taskRepository.create(body as Task);
  }
}
