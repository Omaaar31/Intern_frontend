import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logger } from '../helpers/logger.spec';
import { ICrud } from '../interfaces/i-crud.ts';
import { POE } from '../models/poe';

@Injectable({
  providedIn: 'root',
})
export class POEService implements ICrud<POE> {
  public poes: POE[] = [];
  private itemNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  add(item: POE): void {}

  public update(id: number, poe: POE): void {}

  public delete(poes: POE): Observable<HttpResponse<any>> {
    return this.httpClient.delete(
      `${environment.apiRoot}poes`, // DELETE http://127.0.0.1:5000/poes
      {
        body: poes,
        observe: 'response',
      }
    );
  }

  findAll(): Observable<POE[]> {
    return this.httpClient.get<any>(`${environment.apiRoot}poe`).pipe(
      take(1),
      map((poes: any) => {
        return poes.map((poe: any) => {
          const asClass: POE = new POE().deserialize(poe);
          Logger.info(`Deserialized POE ${JSON.stringify(asClass)}`);
          return asClass;
        });
      })
    );
  }

  findOne(id: number): Observable<POE> {
    return this.httpClient
      .get<any>(
        `${environment.apiRoot}poe/${id}`, // http://127.0.0.1/poes/999,
        {
          observe: 'response',
        }
      )
      .pipe(
        take(1),
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            // Récupérer le "ça" et en faire un vrai poes
            const rawPoe: any = response.body;

            const poe: POE = new POE();
            poe.id = rawPoe.id;
            poe.name = rawPoe.name;
            poe.beginDate = new Date(rawPoe.beginDate);
            poe.endDate = new Date(rawPoe.endDate);

            return poe;
          } else {
            throw new Error(`poes with ${id} was not found!`);
          }
        }),
        throwIfEmpty(() => new Error(`poes with ${id} was not found!`))
      );
  }

  public getNextId(): number {
    return (
      this.poes.sort((poe1: POE, poe2: POE) => {
        return poe2.id! - poe1.id!;
      })[0].id! + 1
    );
  }
}
