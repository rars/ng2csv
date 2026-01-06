import { AutoCsvRowMapper } from './auto-csv-row-mapper.class';

describe('AutoCsvRowMapper', () => {
  interface IMyType {
    id: number;
    name: string;
    address?: string;
    email?: string;
  }

  let rowMapper: AutoCsvRowMapper<IMyType>;
  let myObject: IMyType;
  let mySecondObject: IMyType;
  let myThirdObject: IMyType;

  beforeEach(() => {
    myObject = {
      id: 5,
      name: 'Alice',
    };

    mySecondObject = {
      address: 'Secret Location',
      id: 6,
      name: 'Bob',
    };

    myThirdObject = {
      email: 'charles@mail.com',
      id: 7,
      name: 'Charles',
    };

    rowMapper = new AutoCsvRowMapper([myObject, mySecondObject, myThirdObject]);
  });

  describe('map()', () => {
    it('should return row mapping for object', () => {
      const columnNames: string[] = rowMapper.getColumnNames();
      const row: (string | null | undefined)[] = rowMapper.map({
        address: 'My Address',
        email: 'myemail@mail.com',
        id: 1,
        name: 'My Name',
      });

      expect(row.length).toBe(4);
      expect(row[columnNames.indexOf('id')]).toBe('1');
      expect(row[columnNames.indexOf('name')]).toBe('My Name');
      expect(row[columnNames.indexOf('address')]).toBe('My Address');
      expect(row[columnNames.indexOf('email')]).toBe('myemail@mail.com');
    });

    it('should map missing properties to the empty string', () => {
      const columnNames: string[] = rowMapper.getColumnNames();
      const row: (string | null | undefined)[] = rowMapper.map({
        id: 0,
        name: 'Bob',
      });
      expect(row.length).toBe(4);
      expect(row[columnNames.indexOf('id')]).toBe('0');
      expect(row[columnNames.indexOf('name')]).toBe('Bob');
      expect(row[columnNames.indexOf('address')]).toBe('');
      expect(row[columnNames.indexOf('email')]).toBe('');
    });
  });

  describe('getColumnNames()', () => {
    it('should return list of column names', () => {
      const columnNames: string[] = rowMapper.getColumnNames();
      expect(columnNames.length).toBe(4);
      expect(columnNames.indexOf('address')).toBeGreaterThan(-1);
      expect(columnNames.indexOf('email')).toBeGreaterThan(-1);
      expect(columnNames.indexOf('id')).toBeGreaterThan(-1);
      expect(columnNames.indexOf('name')).toBeGreaterThan(-1);
    });
  });
});
