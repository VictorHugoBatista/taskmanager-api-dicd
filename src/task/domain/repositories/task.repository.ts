import {
  Task,
  TaskForUpdate,
} from '../../application/contracts/entities/task.entity';

export abstract class TaskRepository {
  public abstract create(newTask: Task);
  public abstract list(): Promise<Task[]>;
  public abstract get(id: string): Promise<Task>;
  public abstract delete(id: string): Promise<Task>;
  public abstract update(
    id: string,
    dataForUpdate: TaskForUpdate,
  ): Promise<Task>;
}
