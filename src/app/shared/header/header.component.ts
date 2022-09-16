import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public static sortOrder: number = 1;

  public interns: Intern[] = [];

  public itemNumber$!: BehaviorSubject<number>;

  constructor(
    private internService: InternService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.itemNumber$ = this.internService.displayIntern;
  }
}
