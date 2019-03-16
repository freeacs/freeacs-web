import { UnitArray } from '../unit';

describe('unit', () => {
  it('should work', () => {
    const jsonText =
      '[{"profile":{"id":1,"name":"Profile 1"},"unitId":"123","unitType":{"id":1,"name":"UnitType 1"}}]';
    const result = UnitArray.decode(JSON.parse(jsonText));
    expect(result.isRight()).toEqual(true);
  });
});
