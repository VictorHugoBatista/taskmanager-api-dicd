import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../contracts/entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  create(newTask: Task) {
    return this.repository.create(newTask);
  }
}
