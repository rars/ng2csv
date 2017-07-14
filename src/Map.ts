import { ColumnMap } from './ColumnMap';

export class Map {
  private mapFn: (obj: any) => string;

  public constructor(mapFn: (obj: any) => string) {
    this.mapFn = mapFn;
  }

  public name(columnName: string): ColumnMap {
    return new ColumnMap(columnName, this.mapFn);
  }

  public apply(obj: any): string {
    return this.mapFn(obj);
  }
}
