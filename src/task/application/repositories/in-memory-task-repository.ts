import { Injectable } from '@nestjs/common';
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

  public list(): Task[] {
    return this.data;
  }
}
