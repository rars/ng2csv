export class ColumnMap {

  public readonly name: string;
  private mapFn: (obj: any) => string;

  public constructor(
      columnName: string,
      mapFn: (obj: any) => string) {
    this.name = columnName;
    this.mapFn = mapFn;
  }

  public apply(obj: any): string {
    return this.mapFn(obj);
  }
}
