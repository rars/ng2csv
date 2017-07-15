import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { AutoCsvRowMapper } from './AutoCsvRowMapper';
import { CsvConfiguration } from './CsvConfiguration';
import { ICsvRowMapper } from './ICsvRowMapper';

@Injectable()
export class Ng2CsvService {
  public download<T>(
      data: T[],
      filename: string,
      csvRowMapper?: ICsvRowMapper<T>,
      config: CsvConfiguration = new CsvConfiguration()): void {
    const csvData: string = this.convertToCsv(data, csvRowMapper, config);

    const mimeType: string = 'text/csv; header='
      + (config.includeHeaderLine ? 'present' : 'absent');

    const csvBlob: Blob = new Blob([csvData], { type: mimeType });
    FileSaver.saveAs(csvBlob, filename, true);
  }

  public convertToCsv<T>(
      data: T[],
      csvRowMapper?: ICsvRowMapper<T>,
      config: CsvConfiguration = new CsvConfiguration()): string {
    if (csvRowMapper === undefined) {
      csvRowMapper = new AutoCsvRowMapper(data);
    }

    const rows: string[] = [];

    if (config.includeHeaderLine) {
      const headerFieldSeparator =
        `${config.quote}${config.delimiter}${config.quote}`;
      rows.push(config.quote
        + csvRowMapper.getColumnNames().join(headerFieldSeparator)
        + config.quote);
    }

    for (const row of data) {
      rows.push(csvRowMapper.map(row).join(config.delimiter));
    }

    return rows.join(config.newLine);
  }
}
