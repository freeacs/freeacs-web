import { Profile } from './profile';
import { UnitType } from './unitType';
import * as t from 'io-ts';

export const Unit = t.interface({
  profile: t.exact(Profile),
  unitId: t.string,
  unitType: t.exact(UnitType)
});

export type Unit = t.TypeOf<typeof Unit>;

export const UnitArray = t.array(Unit);

export type UnitArray = t.TypeOf<typeof UnitArray>;
