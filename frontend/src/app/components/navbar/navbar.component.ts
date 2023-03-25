import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'hades-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router ) {

  }
  MANUALS: string = '/manuals';
  EXERCISES: string = '/exercises';
  USERS: string = '/users';


  isActive(activeRoute: string) {
    return this.router.url.includes(activeRoute);
  }

}
