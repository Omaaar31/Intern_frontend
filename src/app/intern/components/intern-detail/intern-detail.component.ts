import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger.spec';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';

@Component({
  selector: 'app-intern-detail',
  templateUrl: './intern-detail.component.html',
  styleUrls: ['./intern-detail.component.scss'],
})
export class InternDetailComponent implements OnInit {
  public initials: string = '';
  public intern: Intern | undefined = undefined;
  private _id!: number;

  constructor(
    private internService: InternService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this._id = +paramMap.get('id')!;
      this.internService.findOne(this._id).subscribe({
        next: (intern: Intern | undefined) => {
          this.intern = intern;
        },
        error: (error) => {
          Logger.info('Error was intercepted : ' + JSON.stringify(error));
        },
      });
    });
  }

  public navigate(): void {
    if (true) {
      this.router.navigate(['/', 'interns']).then((result: boolean) => {
        Logger.info('Bien réussi');
      });
    } else {
    }
  }
}
