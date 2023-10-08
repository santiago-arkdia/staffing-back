import { Types } from 'mongoose';
import { isValidArray } from './array';

export function createFilterObject(filters, fileldsId: string[] = []) {
  return isValidArray(filters)
    ? filters.reduce((acc, cur) => {
        if (!cur?.field || !cur?.value) return acc;

        if (fileldsId.includes(cur.field)) {
          acc[cur.field] = new Types.ObjectId(cur.value);
        } else {
          acc[cur.field] = {
            $regex: cur.value ?? '',
            $options: 'i',
          };
        }

        return acc;
      }, {})
    : {};
}
