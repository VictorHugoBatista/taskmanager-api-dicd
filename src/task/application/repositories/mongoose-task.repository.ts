import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Task,
  TaskDocument,
  TaskForUpdate,
} from '../contracts/entities/task.entity';
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

  public async list(): Promise<Task[]> {
    return await this.model.find({}).exec();
  }

  public async get(id: string): Promise<Task> {
    return await this.model.findById(id);
  }

  public async delete(id: string): Promise<Task> {
    return await this.model.findByIdAndDelete(id);
  }

  public async update(id: string, dataForUpdate: TaskForUpdate): Promise<Task> {
    const taskForUpdateTyped = dataForUpdate as Task;
    taskForUpdateTyped.updatedAt = new Date();
    return await this.model.findByIdAndUpdate(id, taskForUpdateTyped, {
      new: true,
    });
  }
}
