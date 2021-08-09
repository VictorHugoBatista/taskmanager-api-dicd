import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../contracts/entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private model: Model<TaskDocument>,
  ) {}

  public create(newTask: Task) {
    return this.model.create(newTask);
  }
}
