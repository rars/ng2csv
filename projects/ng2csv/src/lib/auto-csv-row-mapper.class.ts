import { ICsvRowMapper } from './csv-row-mapper.interface';
import { OrderedProjectionCsvRowMapper } from './ordered-projection-csv-row-mapper.class';

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

    const projections: Array<[string, (obj: T) => string]> = [];

    const allKeys: string[] = this.getAllKeys(data);
    for (const key of allKeys) {
      projections.push([
        key,
        this.createProjection(key)
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

  private createProjection(property: string): (obj: T) => string {
    return (x: T) => {
      if (x.hasOwnProperty(property)) {
        const propertyValue = (x as any)[property];
        if (propertyValue === undefined || propertyValue === null) {
          return '';
        }
        return propertyValue.toString();
      } else {
        return '';
      }
    };
  }

  private getAllKeys(objs: T[]): string[] {
    const allKeys: any = {};

    for (const obj of objs) {
      for (const objectKey of Object.keys(obj)) {
        allKeys[objectKey] = 1;
      }
    }

    return Object.keys(allKeys);
  }
}
