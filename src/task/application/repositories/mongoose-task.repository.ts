import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../contracts/entities/task.entity';
import { TaskRepository as TaskRepositoryAbstract } from '../../domain/repositories/task.repository';

@Injectable()
export class TaskRepository implements TaskRepositoryAbstract {
  constructor(
    @InjectModel(Task.name)
    private model: Model<TaskDocument>,
  ) {}

  public create(newTask: Task) {
    return this.model.create(newTask);
  }

  /**
   * @todo Implement method.
   */
  public list(): Task[] {
    return [];
  }
}
