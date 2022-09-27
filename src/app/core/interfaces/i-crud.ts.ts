import { Observable } from 'rxjs';

export interface ICrud<T> {
  add(item: T): void;
  update(id: number, item: T): void;
  delete(item: T): void;
  findAll(): Observable<T[]>;
  findOne(id: number): Observable<T | null>;
}
