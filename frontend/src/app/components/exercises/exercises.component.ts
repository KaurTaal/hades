import { Component } from '@angular/core';

@Component({
  selector: 'hades-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  public allExercises?: any[];

  getAllExercises() {
    this.allExercises = [
      "",
      ""
    ]
  }
}
