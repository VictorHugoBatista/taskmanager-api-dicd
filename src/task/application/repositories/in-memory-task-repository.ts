import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MongodbHelper } from '../../../common/application/helpers/mongodb';
import { Task } from '../contracts/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  public data: Task[];

  public constructor() {
    this.data = [];
  }

  public create(newTask: Task) {
    this.data.push(newTask);
    return newTask;
  }

  public async list(): Promise<Task[]> {
    return this.data;
  }

  public async get(id: string): Promise<Task> {
    if (!MongodbHelper.isObjectIdValid(id)) {
      throw new InternalServerErrorException();
    }

    const [task] = this.data.filter((item: Task) => item.id === id);
    return task;
  }

  public async delete(id: string): Promise<Task> {
    if (!MongodbHelper.isObjectIdValid(id)) {
      throw new InternalServerErrorException();
    }

    let task: Task;
    this.data = this.data.filter((item: Task) => {
      const removeItem = item.id !== id;
      if (removeItem) {
        task = item;
      }
      return removeItem;
    });

    return task;
  }
}
