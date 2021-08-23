import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongodbIdValidation } from '../../../common/application/pipes/mongodb-id-validation-pipe';
import { CreateTaskRequest } from '../contracts/requests/create-task-request';
import { UpdateTaskRequest } from '../contracts/requests/update-task-request';
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

  @Patch('/:id/toggle')
  @ApiOperation({ summary: 'Toggle task status between undone and done' })
  @ApiTags('Tasks')
  public async toggle(@Param('id', new MongodbIdValidation()) id: string) {
    const task = await this.taskRepository.get(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update task' })
  @ApiBody({ type: UpdateTaskRequest })
  @ApiTags('Tasks')
  public async update(
    @Param('id', new MongodbIdValidation()) id: string,
    @Body() body: UpdateTaskRequest,
  ) {
    const task = await this.taskRepository.update(id, body as Task);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiTags('Tasks')
  public async delete(@Param('id', new MongodbIdValidation()) id: string) {
    const task = await this.taskRepository.delete(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }
}
