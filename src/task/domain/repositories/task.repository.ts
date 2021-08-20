import { Task } from '../../application/contracts/entities/task.entity';

export abstract class TaskRepository {
  public abstract create(newTask: Task);
  public abstract list(): Promise<Task[]>;
  public abstract get(id: string): Promise<Task>;
  public abstract delete(id: string): Promise<Task>;
  public abstract update(id: string, dataForUpdate: Task): Promise<Task>;
}
