import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICrud } from '../interfaces/i-crud.ts';
import { POE } from '../models/poe';

@Injectable({
  providedIn: 'root',
})
export class POEService implements ICrud<POE> {
  public poes: POE[] = [];
  private itemNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  public add(poe: POE): void {
    if (this.findOne(poe.id!) === null) {
      this.poes.push(poe);
    }
  }

  public update(poe: POE): void {}

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
    let itemNumber: number = 0;
    return this.httpClient.get<any>(`${environment.apiRoot}poe`).pipe(
      //Pipeline :
      take(1), //Take : récupère la première valeur émise par l'Observable (tout le tableau) et stoppe l'observation
      map((rawPoe: any) => {
        // map rxjs = transforme un Obesrvable en un autre Observable
        itemNumber = rawPoe.length;
        this.itemNumber$.next(itemNumber); //Emet la nouvelle valuer
        return rawPoe.map((rawPoe: any) => {
          // J'ai besoin de créer un Objet poe à partir d'un rawPoe
          const poe: POE = new POE();
          poe.id = rawPoe.id;
          poe.title = rawPoe.name;
          poe.beginDate = new Date(rawPoe.beginDate);
          poe.endDate = new Date(rawPoe.endDate);

          return poe;
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
            poe.title = rawPoe.title;
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
