import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { POE } from 'src/app/core/models/poe';
import { POEService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-detail',
  templateUrl: './poe-detail.component.html',
  styleUrls: ['./poe-detail.component.scss'],
})
export class POEDetailComponent implements OnInit, OnDestroy {
  public poe: POE | null = null;
  private _id!: number;

  private subscribers: Subscription[] = [];

  constructor(
    public poeService: POEService,
    private activatedRoute: ActivatedRoute
  ) {}

  //Affiche id dynamique
  ngOnInit(): void {
    //ParamMap : analyse le comportement d'une route
    this.subscribers.push(
      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this._id = +paramMap.get('id')!;
        // this.poe = this.poeService.findOne(this._id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((s: Subscription) => {
      s.unsubscribe();
    });
  }
}
