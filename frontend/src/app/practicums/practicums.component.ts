import { Component } from '@angular/core';

@Component({
  selector: 'app-practicums',
  templateUrl: './practicums.component.html',
  styleUrls: ['./practicums.component.scss']
})
export class PracticumsComponent {
  public allPracticums?: any[];



  getAllPracticums() {
    this.allPracticums = [
      "",
      ""
    ]
  }
}
