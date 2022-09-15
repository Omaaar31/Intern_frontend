import { Component, OnInit } from '@angular/core';
import { Logger } from './core/helpers/logger.spec';
import { StringHelper } from './core/helpers/stringHelpers';
import { Intern } from './core/models/intern';
import { InternService } from './core/services/intern.service';
import { POEService } from './core/services/poe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Hello Angular 13';

  public constructor(
    public internService: InternService,
    public poesService: POEService
  ) {}

  ngOnInit(): void {
    this.internService.findAll().subscribe();
    this.poesService.findAll().subscribe();

    console.log(
      StringHelper.sanitizePunctuation(`Ca va? Toi aussi , bonjour .`)
    );
  }

  public getTitle(): string {
    return this.title;
  }

  /*
  public static sortName(intern1: Intern, intern2: Intern): number {
    return intern1.name.localeCompare(intern2.name) * AppComponent.sortOrder;
  } */

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
