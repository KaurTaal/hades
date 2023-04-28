import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../public/services/auth.service";

@Component({
  selector: 'hades-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  MANUALS: string = 'protected/manuals';
  EXERCISES: string = 'protected/exercises';
  USERS: string = 'protected/users';
  userEmail: string = "";

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.userEmail = this.authService.getEmail();
  }

  isActive(activeRoute: string) {
    return this.router.url.includes(activeRoute);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]).then();
  }
}
