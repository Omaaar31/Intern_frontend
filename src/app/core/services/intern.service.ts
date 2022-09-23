import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  map,
  take,
  BehaviorSubject,
  throwIfEmpty,
  catchError,
  throwError,
} from 'rxjs';
import { Logger } from '../helpers/logger.spec';
import { ICrud } from '../interfaces/i-crud.ts';
import { Intern } from '../models/intern';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InternService implements ICrud<Intern> {
  public interns: Intern[] = [];
  private itemNumber$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Intern[]> {
    let itemNumber: number = 0;
    return this.httpClient.get<any>(`${environment.apiRoot}intern`).pipe(
      //Pipeline :
      take(1), //Take : récupère la première valeur émise par l'Observable (tout le tableau) et stoppe l'observation
      map((rawInterns: any) => {
        // map rxjs = transforme un Obesrvable en un autre Observable
        itemNumber = rawInterns.length;
        this.itemNumber$.next(itemNumber); //Emet la nouvelle valuer
        return rawInterns.map((rawIntern: any) => {
          // J'ai besoin de créer un Objet Intern à partir d'un rawIntern
          const intern: Intern = new Intern();
          intern.id = rawIntern.id;
          intern.name = rawIntern.name;
          intern.firstName = rawIntern.firstName;
          intern.birthDate = new Date(rawIntern.birthDate);
          intern.adress = rawIntern.adress;
          intern.phoneNumber = rawIntern.phoneNumber;
          intern.email = rawIntern.email;
          return intern;
        });
      })
    );
  }

  findOne(id: number): Observable<Intern> {
    return this.httpClient
      .get<any>(
        `${environment.apiRoot}intern/${id}`, // http://127.0.0.1/intern/999,
        {
          observe: 'response',
        }
      )
      .pipe(
        take(1),
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            // Récupérer le "ça" et en faire un vrai Intern
            const rawIntern: any = response.body;

            const intern: Intern = new Intern();
            intern.id = rawIntern.id;
            intern.name = rawIntern.name;
            intern.firstName = rawIntern.firstName;
            intern.birthDate = new Date(rawIntern.birthDate);
            intern.adress = rawIntern.adress;
            intern.phoneNumber = rawIntern.phoneNumber;
            intern.email = rawIntern.email;

            return intern;
          } else {
            throw new Error(`Intern with ${id} was not found!`);
          }
        }),
        throwIfEmpty(() => new Error(`Intern with ${id} was not found!`))
      );
  }

  public get displayIntern(): BehaviorSubject<number> {
    return this.itemNumber$;
  }

  public delete(intern: Intern): Observable<HttpResponse<any>> {
    this.itemNumber$.next(this.itemNumber$.getValue() - 1);
    return this.httpClient.delete(
      `${environment.apiRoot}intern`, // DELETE http://127.0.0.1:5000/intern
      {
        body: intern,
        observe: 'response',
      }
    );
  }

  public add(internData: unknown): Observable<Intern> {
    return this.httpClient
      .post<any>(`${environment.apiRoot}intern`, internData)
      .pipe(
        take(1),
        map((rawIntern: unknown) => {
          return new Intern().deserialize(rawIntern);
        })
      );
  }

  public update(intern: Intern): void {}

  public getNextId(): number {
    return 0;
  }
}
