import { Injectable, NotFoundException } from '@nestjs/common';
import { MongodbHelper } from '../helpers/mongodb';

@Injectable()
export class MongodbIdValidation {
  transform(value: string) {
    MongodbHelper.validateObjectId(value, new NotFoundException());
    return value;
  }
}
