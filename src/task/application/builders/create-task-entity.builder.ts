import { datatype, lorem, random } from 'faker';
import { Task } from '../contracts/entities/task.entity';

export class CreateTaskBuilder {
  public static build(): Task {
    return {
      _id: random.alphaNumeric(),
      title: lorem.sentence(),
      description: lorem.sentences(),
      isDone: datatype.boolean(),
      createdAt: datatype.datetime(),
      updatedAt: datatype.datetime(),
    };
  }
}
