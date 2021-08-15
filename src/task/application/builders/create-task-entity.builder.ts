import { datatype, lorem, random } from 'faker';
import { ObjectId } from 'mongodb';
import { Task } from '../contracts/entities/task.entity';

export class CreateTaskBuilder {
  public static build(): Task {
    return {
      id: ObjectId.generate().toString(),
      title: lorem.sentence(),
      description: lorem.sentences(),
      isDone: datatype.boolean(),
      createdAt: datatype.datetime(),
      updatedAt: datatype.datetime(),
    };
  }
}
