export class CsvConfiguration {
  public delimiter: string = ',';
  public quote: string = '"';
  public newLine: string = '\r\n';
  public includeHeaderLine: boolean = true;
  public outputValueForNull: string = '';
  public outputValueForUndefined: string = '';
}
