import { ICsvRowMapper } from './ICsvRowMapper';
import { OrderedProjectionCsvRowMapper } from './OrderedProjectionCsvRowMapper';

export class AutoCsvRowMapper<T> implements ICsvRowMapper<T> {

  private derivedCsvRowMapper: OrderedProjectionCsvRowMapper<T>;

  public constructor(data: T[]) {
    if (!data || data.length === 0) {
      throw new Error(
        'Parameter \'data\' must be a non-empty array of objects.');
    }

    if (typeof data[0] !== 'object') {
      throw new Error(
        'Parameter \'data\' must contain objects.'
      );
    }

    const firstRow = data[0];
    const projections: Array<[string, (obj: T) => string]> = [];
    for (const property of Object.keys(firstRow)) {
      projections.push([
        property,
        (x: T) => {
          if (x.hasOwnProperty(property)) {
            const propertyValue = (x as any)[property];
            if (propertyValue === undefined || propertyValue === null) {
              return '';
            }
            return propertyValue.toString();
          } else {
            return '';
          }
        }
      ]);
    }

    this.derivedCsvRowMapper = new OrderedProjectionCsvRowMapper<T>(
      projections
    );
  }

  public getColumnNames(): string[] {
    return this.derivedCsvRowMapper.getColumnNames();
  }

  public map(obj: T): string[] {
    return this.derivedCsvRowMapper.map(obj);
  }
}
