import { Injectable, NotFoundException } from '@nestjs/common';
import { MongodbHelper } from '../helpers/mongodb';

@Injectable()
export class MongodbIdValidation {
  transform(value: string) {
    if (!MongodbHelper.isObjectIdValid(value)) {
      throw new NotFoundException();
    }
    return value;
  }
}
