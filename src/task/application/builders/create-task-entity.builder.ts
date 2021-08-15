import { datatype, lorem } from 'faker';
import { Task } from '../contracts/entities/task.entity';
import { MongodbHelper } from '../../../common/application/helpers/mongodb';

export class CreateTaskBuilder {
  public static build(): Task {
    return {
      id: MongodbHelper.generateObjectId(),
      title: lorem.sentence(),
      description: lorem.sentences(),
      isDone: datatype.boolean(),
      createdAt: datatype.datetime(),
      updatedAt: datatype.datetime(),
    };
  }
}
