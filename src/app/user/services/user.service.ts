import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger.spec';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [
    {
      login: 'bond',
      pass: '007',
    },
    { login: 'captain', pass: 'america' },
  ];

  private user: UserModel | null = null;

  private readonly STORAGE_KEY: string = 'auth-token';

  constructor(private router: Router) {}

  /**
   *
   * @param credentials From signinForm (login and password user entered)
   * credentials => {login: 'toto', pass: 'titi'}
   */

  public signin(credentials: any): void {
    Logger.info(JSON.stringify(credentials));
    //Aproche old school
    for (let i: number = 0; i < this.users.length; i++) {
      const inUser: any = this.users[i];
      if (
        inUser.login === credentials.login &&
        inUser.pass === credentials.pass
      ) {
        this.user = new UserModel();
        this.user.setLogin(credentials.login);
        this.user.setToken(credentials.login + '.xxxxx.yyyyy');
      }
    }

    //Approche Yassine
    for (const inUser of this.users) {
      if (
        inUser.login === credentials.login &&
        inUser.pass === credentials.pass
      ) {
        this.user = new UserModel();
        this.user.setLogin(credentials.login);
        this.user.setToken(credentials.login + '.xxxxx.yyyyy');
      }
    }

    //Approche JL : find
    const foundUser: any = this.users.find(
      (inUser: any) =>
        inUser.login === credentials.login && inUser.pass === credentials.pass
    );
    if (foundUser) {
      this.user = new UserModel();
      this.user.setLogin(credentials.login);
      this.user.setToken(credentials.login + '.xxxxx.yyyyy');

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user));
    }
  }

  public signout(): void {
    this.user = null;

    localStorage.removeItem(this.STORAGE_KEY);

    this.router.navigate(['/', 'signin']);
  }

  /**
   *
   * @returns Yes or No a user was authenticated
   */
  public isAuthenticated(): boolean {
    return this.user !== null;
  }
}
