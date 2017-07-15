export interface ICsvRowMapper<T> {
  getColumnNames(): string[];
  map(obj: T): string[];
}
