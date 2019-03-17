import * as t from 'io-ts';

export const UnitType = t.interface({
  id: t.number,
  name: t.string
});

export const UnitTypeArray = t.array(UnitType);

export type UnitType = t.TypeOf<typeof UnitType>;
