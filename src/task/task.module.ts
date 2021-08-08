import { Module } from '@nestjs/common';
import { TaskController } from './application/controllers/task.controller';

@Module({
  controllers: [TaskController],
})
export class TaskModule {}
