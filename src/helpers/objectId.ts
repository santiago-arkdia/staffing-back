import { Types } from 'mongoose';

export function ObjectId(id: string) {
  return new Types.ObjectId(id);
}

export function objectIdToString(objectId) {
  if (objectId && objectId.toString) {
    return objectId.toString();
  } else {
    return null;
  }
}
