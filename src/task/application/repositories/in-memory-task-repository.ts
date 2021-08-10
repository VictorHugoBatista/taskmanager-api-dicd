import { Injectable } from '@nestjs/common';
import { Task } from '../contracts/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[];

  public create(newTask: Task) {
    this.tasks.push(newTask);
    return newTask;
  }
}
