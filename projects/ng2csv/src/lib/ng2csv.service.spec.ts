import { TestBed } from '@angular/core/testing';
import { CsvConfiguration } from './csv-configuration.class';

import { Ng2CsvService } from './ng2csv.service';
import { OrderedProjectionCsvRowMapper } from './ordered-projection-csv-row-mapper.class';

describe('Ng2CsvService', () => {
  let service: Ng2CsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ng2CsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('convertToCsv()', () => {
    it('should auto map data to csv', () => {
      const csv = service.convertToCsv([
        {
          id: 1,
          name: 'Alice',
        },
        {
          id: 2,
          name: 'Bob',
        },
      ]);

      expect(csv).toBe('"id","name"\r\n1,Alice\r\n2,Bob');
    });

    it('should escape quote characters in column headers', () => {
      const config = new CsvConfiguration();
      config.quote = "'";

      const csv = service.convertToCsv(
        [
          {
            id: 1,
            name: 'Alice',
          },
          {
            id: 2,
            name: 'Bob',
          },
        ],
        new OrderedProjectionCsvRowMapper([
          ["Person's Id", (x) => x.id.toString()],
          ["Person's 'Name'", (x) => x.name],
        ]),
        config
      );

      expect(csv).toBe(
        "'Person''s Id','Person''s ''Name'''\r\n" + '1,Alice\r\n2,Bob'
      );
    });

    it('should escape quote and delimiter characters in row values', () => {
      const csv = service.convertToCsv([
        {
          id: '1,000',
          name: 'Smith, Alice',
        },
        {
          id: 2,
          name: '"Bob" Smith',
        },
      ]);

      expect(csv).toBe(
        '"id","name"\r\n' + '"1,000","Smith, Alice"\r\n2,"""Bob"" Smith"'
      );
    });

    it('should output null values as configured value', () => {
      const config = new CsvConfiguration();
      config.outputValueForNull = 'NULL';

      const csv = service.convertToCsv(
        [
          {
            id: 'X1000',
            name: 'Alice',
          },
          {
            id: null,
            name: 'Bob',
          },
        ],
        new OrderedProjectionCsvRowMapper([
          ['Id', (x) => x.id],
          ['Name', (x) => x.name],
        ]),
        config
      );

      expect(csv).toBe('"Id","Name"\r\n' + 'X1000,Alice\r\nNULL,Bob');
    });

    it('should output undefined values as configured value', () => {
      const config = new CsvConfiguration();
      config.outputValueForUndefined = 'UNDEFINED';

      const csv = service.convertToCsv(
        [
          {
            id: 'X1000',
            name: 'Alice',
          },
          {
            id: undefined,
            name: 'Bob',
          },
        ],
        new OrderedProjectionCsvRowMapper([
          ['Id', (x) => x.id],
          ['Name', (x) => x.name],
        ]),
        config
      );

      expect(csv).toBe('"Id","Name"\r\n' + 'X1000,Alice\r\nUNDEFINED,Bob');
    });

    it('should output null/undefined values as empty string by default', () => {
      const csv = service.convertToCsv(
        [
          {
            id: 'X1000',
            name: null,
          },
          {
            id: undefined,
            name: 'Bob',
          },
        ],
        new OrderedProjectionCsvRowMapper([
          ['Id', (x) => x.id],
          ['Name', (x) => x.name],
        ])
      );

      expect(csv).toBe('"Id","Name"\r\n' + 'X1000,\r\n,Bob');
    });
  });
});
