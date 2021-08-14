import { datatype, lorem } from 'faker';
import { Task } from '../contracts/entities/task.entity';

export class CreateTaskBuilder {
  public static build(): Task {
    return {
      id: datatype.number(),
      title: lorem.sentence(),
      description: lorem.sentences(),
      isDone: datatype.boolean(),
      createdAt: datatype.datetime(),
      updatedAt: datatype.datetime(),
    };
  }
}
