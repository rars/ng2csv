import { ICsvRowMapper } from './csv-row-mapper.interface';

export class OrderedProjectionCsvRowMapper<T> implements ICsvRowMapper<T> {
  private readonly projections: Array<
    [string, (obj: T) => string | null | undefined]
  >;

  public constructor(
    projections: Array<[string, (obj: T) => string | null | undefined]>
  ) {
    this.projections = projections;
  }

  public getColumnNames(): string[] {
    return this.projections.map((x) => x[0]);
  }

  public map(obj: T): (string | null | undefined)[] {
    return this.projections.map((x) => x[1](obj));
  }
}
