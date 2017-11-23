import { AutoCsvRowMapper } from '../src/AutoCsvRowMapper';

describe('AutoCsvRowMapper', () => {
  interface IMyType {
    Id: number;
    Name: string;
    Address?: string;
    Email?: string;
  }

  let rowMapper: AutoCsvRowMapper<IMyType>;
  let myObject: IMyType;
  let mySecondObject: IMyType;
  let myThirdObject: IMyType;

  beforeEach(() => {
    myObject = {
      Id: 5,
      Name: 'Alice'
    };

    mySecondObject = {
      Address: 'Secret Location',
      Id: 6,
      Name: 'Bob'
    };

    myThirdObject = {
      Email: 'charles@mail.com',
      Id: 7,
      Name: 'Charles'
    };

    rowMapper = new AutoCsvRowMapper([
      myObject,
      mySecondObject,
      myThirdObject
    ]);
  });

  describe('map()', () => {
    it('should return row mapping for object', () => {
      const columnNames: string[] = rowMapper.getColumnNames();
      const row: string[] = rowMapper.map({
        Address: 'My Address',
        Email: 'myemail@mail.com',
        Id: 1,
        Name: 'My Name'
      });

      expect(row.length).toBe(4);
      expect(row[columnNames.indexOf('Id')]).toBe('1');
      expect(row[columnNames.indexOf('Name')]).toBe('My Name');
      expect(row[columnNames.indexOf('Address')]).toBe('My Address');
      expect(row[columnNames.indexOf('Email')]).toBe('myemail@mail.com');
    });

    it('should map missing properties to the empty string', () => {
      const columnNames: string[] = rowMapper.getColumnNames();
      const row: string[] = rowMapper.map({
        Id: undefined,
        Name: 'Bob'
      });
      expect(row.length).toBe(4);
      expect(row[columnNames.indexOf('Id')]).toBe('');
      expect(row[columnNames.indexOf('Name')]).toBe('Bob');
      expect(row[columnNames.indexOf('Address')]).toBe('');
      expect(row[columnNames.indexOf('Email')]).toBe('');
    });
  });

  describe('getColumnNames()', () => {
    it('should return list of column names', () => {
      const columnNames: string[] = rowMapper.getColumnNames();
      expect(columnNames.length).toBe(4);
      expect(columnNames.indexOf('Address')).toBeGreaterThan(-1);
      expect(columnNames.indexOf('Email')).toBeGreaterThan(-1);
      expect(columnNames.indexOf('Id')).toBeGreaterThan(-1);
      expect(columnNames.indexOf('Name')).toBeGreaterThan(-1);
    });
  });
});
