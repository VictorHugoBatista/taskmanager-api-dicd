import { CreateTaskRequest } from '../contracts/requests/create-task-request';

export class CreateTaskBuilder {
  public static build(): CreateTaskRequest {
    return {
      title: 'test hardcoded t',
      description: 'test hardcoded d',
    };
  }
}
