import { lorem } from 'faker';
import { CreateTaskRequest } from '../contracts/requests/create-task-request';

export class CreateTaskBuilder {
  public static build(): CreateTaskRequest {
    return {
      title: lorem.sentence(),
      description: lorem.sentences(),
    };
  }
}
