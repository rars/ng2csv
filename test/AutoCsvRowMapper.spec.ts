import { AutoCsvRowMapper } from '../src/AutoCsvRowMapper';

describe('AutoCsvRowMapper', () => {
  interface IMyType {
    Id: number;
    Name: string;
  }

  let rowMapper: AutoCsvRowMapper<IMyType>;
  let myObject: IMyType;

  beforeEach(() => {
    myObject = {
      Id: 5,
      Name: 'Alice'
    };

    rowMapper = new AutoCsvRowMapper([myObject]);
  });

  describe('map()', () => {
    it('should return row mapping for object', () => {
      const row: string[] = rowMapper.map(myObject);
      expect(row.length).toBe(2);
      expect(row[0]).toBe('5');
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
