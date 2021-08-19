import { Injectable } from '@nestjs/common';
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
    MongodbHelper.validateObjectId(id);

    const [task] = this.data.filter((item: Task) => item.id === id);
    return task;
  }

  public async delete(id: string): Promise<Task> {
    MongodbHelper.validateObjectId(id);

    let task: Task = null;
    this.data = this.data.filter((item: Task) => {
      const removeItem = item.id === id;
      if (removeItem) {
        task = item;
      }
      return removeItem;
    });

    return task;
  }

  public async update(id: string, dataForUpdate: Task): Promise<Task> {
    MongodbHelper.validateObjectId(id);

    dataForUpdate.updatedAt = new Date();

    let taskKey: number;
    let [task] = this.data.filter((item: Task, taskArrayKey: number) => {
      if (item.id === id) {
        taskKey = taskArrayKey;
      }
      return item.id === id;
    });
    task = {
      ...task,
      ...dataForUpdate,
    };
    this.data[taskKey] = task;

    return task;
  }
}
