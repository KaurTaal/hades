import {Component} from '@angular/core';
import {AuthService} from "../../../public/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'hades-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public isCollapsed: boolean = false;
  public menuStyle: string = 'close-menu';

  constructor(private authService: AuthService, private router: Router) {
  }

  toggleMenuBar() {
    this.menuStyle = this.menuStyle === 'close-menu' ? 'open-menu' : 'close-menu';
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]).then();
  }

}
