import { ObjectId } from 'mongodb';

export const MongodbHelper = {
  generateObjectId(): string {
    return new ObjectId().toHexString();
  },
  isObjectIdValid(objectId: string): boolean {
    return ObjectId.isValid(objectId);
  },
};
