export class UserModel {
  private login: string = '';
  private token: string = '';

  public getLogin(): string {
    return this.login;
  }

  public setLogin(login: string): void {
    this.login = login;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }
}
