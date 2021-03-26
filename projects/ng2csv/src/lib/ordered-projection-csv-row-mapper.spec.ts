import { OrderedProjectionCsvRowMapper } from './ordered-projection-csv-row-mapper.class';

describe('OrderedProjectionCsvRowMapper', () => {
  interface IMyType {
    Id: number;
    Name: string;
  }

  let rowMapper: OrderedProjectionCsvRowMapper<IMyType>;

  beforeEach(() => {
    rowMapper = new OrderedProjectionCsvRowMapper([
      ['Id', x => x.Id.toString()],
      ['Name', x => x.Name]
    ]);
  });

  describe('map()', () => {
    it('should return row mapping for object', () => {
      const myObject: IMyType = {
        Id: 2,
        Name: 'Alice'
      };

      const row: string[] = rowMapper.map(myObject);
      expect(row.length).toBe(2);
      expect(row[0]).toBe('2');
      expect(row[1]).toBe('Alice');
    });
  });

  describe('getColumnNames()', () => {
    it('should return list of column names', () => {
      const columnNames: string[] = rowMapper.getColumnNames();
      expect(columnNames.length).toBe(2);
      expect(columnNames[0]).toBe('Id');
      expect(columnNames[1]).toBe('Name');
    });
  });
});
