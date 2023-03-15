import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router ) {

  }
  MANUALS: string = '/manuals';
  PRACTICUMS: string = '/practicums';
  HOMEWORKS: string = '/homeworks';
  ASSESSMENTS: string = '/assessment';
  EXAMS: string = '/exams';
  EXTRA: string = '/extra';

  isActive(activeRoute: string) {
    return this.router.url.includes(activeRoute);
  }

}
