import { inject, TestBed } from '@angular/core/testing';
import { Ng2CsvService } from '../src/Ng2Csv.service';
import { CsvConfiguration } from '../src/CsvConfiguration';
import { OrderedProjectionCsvRowMapper } from '../src/OrderedProjectionCsvRowMapper';

describe('Ng2CsvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Ng2CsvService
      ]
    });
  });

  describe('convertToCsv()', () => {
    it('should auto map data to csv',
      inject([Ng2CsvService], (ng2CsvService: Ng2CsvService) => {
        const csv = ng2CsvService.convertToCsv([
          {
            id: 1,
            name: 'Alice'
          },
          {
            id: 2,
            name: 'Bob'
          }
        ]);

        expect(csv).toBe('"id","name"\r\n1,Alice\r\n2,Bob');
    }));

    it('should escape quote characters in column headers',
      inject([Ng2CsvService], (ng2CsvService: Ng2CsvService) => {
        const config = new CsvConfiguration();
        config.quote = '\'';

        const csv = ng2CsvService.convertToCsv([
            {
              id: 1,
              name: 'Alice'
            },
            {
              id: 2,
              name: 'Bob'
            }
          ],
          new OrderedProjectionCsvRowMapper([
            ['Person\'s Id', x => x.id.toString()],
            ['Person\'s \'Name\'', x => x.name]
          ]),
          config);

        expect(csv).toBe(
          '\'Person\'\'s Id\',\'Person\'\'s \'\'Name\'\'\'\r\n'
          + '1,Alice\r\n2,Bob');
      }));

    it('should escape quote and delimiter characters in row values',
      inject([Ng2CsvService], (ng2CsvService: Ng2CsvService) => {
        const csv = ng2CsvService.convertToCsv([
            {
              id: '1,000',
              name: 'Smith, Alice'
            },
            {
              id: 2,
              name: '"Bob" Smith'
            }
          ]);

        expect(csv).toBe(
          '"id","name"\r\n'
          + '"1,000","Smith, Alice"\r\n2,"""Bob"" Smith"');
      }));

    it('should output null values as configured value',
      inject([Ng2CsvService], (ng2CsvService: Ng2CsvService) => {
        const config = new CsvConfiguration();
        config.outputValueForNull = 'NULL';

        const csv = ng2CsvService.convertToCsv([
            {
              id: 'X1000',
              name: 'Alice'
            },
            {
              id: null,
              name: 'Bob'
            }
          ],
          new OrderedProjectionCsvRowMapper([
            ['Id', x => x.id],
            ['Name', x => x.name]
          ]),
          config);

        expect(csv).toBe(
          '"Id","Name"\r\n'
          + 'X1000,Alice\r\nNULL,Bob'
        );
      }));

    it('should output undefined values as configured value',
      inject([Ng2CsvService], (ng2CsvService: Ng2CsvService) => {
        const config = new CsvConfiguration();
        config.outputValueForUndefined = 'UNDEFINED';

        const csv = ng2CsvService.convertToCsv([
            {
              id: 'X1000',
              name: 'Alice'
            },
            {
              id: undefined,
              name: 'Bob'
            }
          ],
          new OrderedProjectionCsvRowMapper([
            ['Id', x => x.id],
            ['Name', x => x.name]
          ]),
          config);

        expect(csv).toBe(
          '"Id","Name"\r\n'
          + 'X1000,Alice\r\nUNDEFINED,Bob'
        );
      }));

    it('should output null/undefined values as empty string by default',
      inject([Ng2CsvService], (ng2CsvService: Ng2CsvService) => {
        const csv = ng2CsvService.convertToCsv([
            {
              id: 'X1000',
              name: null
            },
            {
              id: undefined,
              name: 'Bob'
            }
          ],
          new OrderedProjectionCsvRowMapper([
            ['Id', x => x.id],
            ['Name', x => x.name]
          ]));

        expect(csv).toBe(
          '"Id","Name"\r\n'
          + 'X1000,\r\n,Bob'
        );
      }));
  });
});
