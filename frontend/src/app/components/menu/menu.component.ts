import {Component} from '@angular/core';

@Component({
  selector: 'hades-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public isCollapsed: boolean = false;
  public menuStyle: string = 'close-menu';

  public toggleMenuBar() {
    this.menuStyle = this.menuStyle === 'close-menu' ? 'open-menu' : 'close-menu';
    this.isCollapsed = !this.isCollapsed;
  }
}
