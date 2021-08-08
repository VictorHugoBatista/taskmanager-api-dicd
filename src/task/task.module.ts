import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './application/controllers/task.controller';
import { Task, TaskSchema } from './application/contracts/entities/task.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers: [TaskController],
})
export class TaskModule {}
