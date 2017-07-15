import { ICsvRowMapper } from './ICsvRowMapper';

export class OrderedProjectionCsvRowMapper<T>
    implements ICsvRowMapper<T> {

  private projections: Array<[string, (obj: T) => string]>;

  public constructor(
      projections: Array<[string, (obj: T) => string]>) {
    this.projections = projections;
  }

  public getColumnNames(): string[] {
    return this.projections.map(x => x[0]);
  }

  public map(obj: T): string[] {
    return this.projections.map(x => x[1](obj));
  }
}
