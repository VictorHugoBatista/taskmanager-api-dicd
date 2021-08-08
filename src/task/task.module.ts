import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';

@Module({
  controllers: [TaskController],
})
export class TaskModule {}
