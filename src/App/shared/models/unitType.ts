import * as t from 'io-ts';
import { Profile } from './profile';

export const UnitType = t.interface({
  id: t.number,
  protocol: t.string,
  name: t.string,
  vendor: t.string,
  description: t.string,
  profiles: t.array(Profile)
});

export const UnitTypeArray = t.array(UnitType);

export type UnitTypeArray = t.TypeOf<typeof UnitTypeArray>;

export type UnitType = t.TypeOf<typeof UnitType>;
