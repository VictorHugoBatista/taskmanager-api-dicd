import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export const MongodbHelper = {
  generateObjectId(): string {
    return new ObjectId().toHexString();
  },
  isObjectIdValid(objectId: string): boolean {
    return ObjectId.isValid(objectId);
  },
  validateObjectId(
    objectId: string,
    exceptionType: HttpException = new InternalServerErrorException(),
  ) {
    if (!this.isObjectIdValid(objectId)) {
      throw exceptionType;
    }
  },
};
