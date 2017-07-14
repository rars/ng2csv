import { ColumnMap } from '../src/ColumnMap';

describe('ColumnMap', () => {
  describe('apply()', () => {
    it('should apply function to supplied object', () => {
      const map = new ColumnMap('Id', x => x.Id.toString());
      expect(map.apply({Id: 1, Name: 'Albert'})).toBe('1');
    });
  });
});
