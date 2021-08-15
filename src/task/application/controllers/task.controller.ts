import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongodbIdValidation } from '../../../common/application/pipes/mongodb-id-validation-pipe';
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
  public async show(@Param('id', new MongodbIdValidation()) id: string) {
    const task = await this.taskRepository.get(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskRequest })
  @ApiTags('Tasks')
  public create(@Body() body: CreateTaskRequest) {
    return this.taskRepository.create(body as Task);
  }
}
