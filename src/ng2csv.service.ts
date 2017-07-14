import { Injectable } from '@angular/core';
import { ColumnMap } from './ColumnMap';
import * as FileSaver from 'file-saver';

@Injectable()
export class Ng2CsvService {
  public download(
      columnMap: Array<ColumnMap>,
      data: Array<any>,
      filename: string): void {
    const csvData: string = this.convertToCsv(columnMap, data);
    const csvBlob: Blob = new Blob([csvData], { type: 'text/csv' });
    FileSaver.saveAs(csvBlob, filename, true);
  }

  public convertToCsv(
      columnMap: Array<ColumnMap>,
      data: Array<any>): string {
    const newLine = '\r\n';
    let csvResult = '"' + columnMap.map(x => x.name).join('","')
      + '"' + newLine;

    for (let row of data) {
      csvResult += columnMap.map(x => x.apply(row)).join(',');
      csvResult += newLine;
    }

    return csvResult;
  }
}
