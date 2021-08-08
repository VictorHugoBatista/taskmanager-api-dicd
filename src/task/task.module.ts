import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './application/controllers/task.controller';
import { TaskRepository } from './application/repositories/task.repository';
import { Task, TaskSchema } from './application/contracts/entities/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
