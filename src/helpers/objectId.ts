import { Types } from 'mongoose';

export function ObjectId(id: string) {
  return new Types.ObjectId(id);
}
