import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'hades';
  currentActiveView: string = '';

  ngOnInit() {
    this.currentActiveView = '/manuals'
  }
}
