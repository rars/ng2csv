import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { AutoCsvRowMapper } from './auto-csv-row-mapper.class';
import { CsvConfiguration } from './csv-configuration.class';
import { ICsvRowMapper } from './csv-row-mapper.interface';

@Injectable({
  providedIn: 'root',
})
export class Ng2CsvService {
  public download<T extends object>(
    data: T[],
    filename: string,
    csvRowMapper?: ICsvRowMapper<T>,
    config: CsvConfiguration = new CsvConfiguration()
  ): void {
    const csvData: string = this.convertToCsv(data, csvRowMapper, config);

    const mimeType: string =
      'text/csv; header=' + (config.includeHeaderLine ? 'present' : 'absent');

    const csvBlob: Blob = new Blob([csvData], { type: mimeType });
    saveAs(csvBlob, filename, { autoBom: false });
  }

  public convertToCsv<T extends object>(
    data: T[],
    csvRowMapper?: ICsvRowMapper<T>,
    config: CsvConfiguration = new CsvConfiguration()
  ): string {
    if (csvRowMapper === undefined) {
      csvRowMapper = new AutoCsvRowMapper(data);
    }

    const rows: string[] = [];

    if (config.includeHeaderLine) {
      const headerFieldSeparator = `${config.quote}${config.delimiter}${config.quote}`;
      rows.push(
        config.quote +
          csvRowMapper
            .getColumnNames()
            .map((x) => this.escapeQuotes(x, config.quote))
            .join(headerFieldSeparator) +
          config.quote
      );
    }

    for (const row of data) {
      rows.push(
        csvRowMapper
          .map(row)
          .map((x) => this.mapNullOrUndefinedValues(x, config))
          .map((x) => this.escapeRowValue(x, config))
          .join(config.delimiter)
      );
    }

    return rows.join(config.newLine);
  }

  private mapNullOrUndefinedValues(
    value: string | null | undefined,
    config: CsvConfiguration
  ): string {
    switch (value) {
      case null: {
        return config.outputValueForNull;
      }
      case undefined: {
        return config.outputValueForUndefined;
      }
      default: {
        return value;
      }
    }
  }

  private escapeQuotes(value: string, quoteChar: string): string {
    return value.replace(
      new RegExp(quoteChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      quoteChar + quoteChar
    );
  }

  private escapeRowValue(value: string, config: CsvConfiguration): string {
    if (
      value.indexOf(config.delimiter) > -1 ||
      value.indexOf(config.quote) > -1
    ) {
      const escapedValue = this.escapeQuotes(value, config.quote);
      return `${config.quote}${escapedValue}${config.quote}`;
    }
    return value;
  }
}
