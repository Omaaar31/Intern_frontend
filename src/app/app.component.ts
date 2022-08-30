import { Component } from '@angular/core';
import { Logger } from './core/helpers/logger.spec';
import { Intern } from './core/models/intern';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Hello Angular 13';

  public static sortOrder: number = 1;

  public intern: Intern = {
    name: 'Aubert',
    firstname: 'Jean-Luc',
    phoneNumber: '0505050505',
    email: 'jla@gmail.com',
  };

  public interns: Intern[] = [
    this.intern,
    {
      name: 'Pina',
      firstname: 'Monica',
      email: 'monica@gmail.com',
      phoneNumber: '07070707',
    },
    {
      name: 'Castanie',
      firstname: 'Piotr',
      email: 'piotr@gmail.com',
      phoneNumber: '0808080808',
    },
  ];

  public onDelete(intern: Intern): void {
    console.log('Click was detected');
    this.interns.splice(this.interns.indexOf(intern), 1);
  }

  public getTitle(): string {
    return this.title;
  }

  public sortByName(): void {
    Logger.info(`Before sort, sortOrder is : ${AppComponent.sortOrder}`);
    this.interns.sort(AppComponent.sortName);
    AppComponent.sortOrder = AppComponent.sortOrder * -1;
    Logger.info(`After sort, sortOrder is : ${AppComponent.sortOrder}`);
  }

  public static sortName(intern1: Intern, intern2: Intern): number {
    return intern1.name.localeCompare(intern2.name) * AppComponent.sortOrder;
  }

  /*   public static sortName(intern1: Intern, intern2: Intern): number {
    if (intern1.name > intern2.name) {
      return 1 * AppComponent.sortOrder;
    } else if (intern1.name < intern2.name) {
      return -1 * AppComponent.sortOrder;
    } else {
      return 0;
    }
  } */
}
