import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { POE } from 'src/app/core/models/poe';
import { POEService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-table',
  templateUrl: './poe-table.component.html',
  styleUrls: ['./poe-table.component.scss'],
})
export class POETableComponent implements OnInit {
  public poes!: POE[];
  constructor(public poeService: POEService) {}

  ngOnInit(): void {
    this.poeService
      .findAll()
      .pipe(take(1))
      .subscribe((poes: POE[]) => {
        this.poes = poes;
      });
  }

  public onDelete(poe: POE): void {
    this.poeService.delete(poe);
  }
}
