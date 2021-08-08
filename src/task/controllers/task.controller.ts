import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiTags('Tasks')
  create() {
    return {
      healthy: true,
    };
  }
}
