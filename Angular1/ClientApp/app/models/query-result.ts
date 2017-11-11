export interface QueryResult<T> {
  totalItems?: number;
  results?: T[];
}