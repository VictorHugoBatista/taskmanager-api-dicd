import { Task } from '../../application/contracts/entities/task.entity';

export abstract class TaskRepository {
  public abstract create(newTask: Task);
  public abstract list(): Promise<Task[]>;
}
