import {Component} from '@angular/core';
import {AuthService} from "./public/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hades';

  constructor(private authService: AuthService) {
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }


}
