import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Exercise} from "../classes/Exercise";
import {Manual} from "../classes/Manual";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private uploadedExercise: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private uploadedManual: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor() { }

  setUploadedManual(data: Manual | null) {
    this.uploadedManual.next(data);
  }

  setUploadedExercise(data: Exercise | null) {
    this.uploadedExercise.next(data);
  }

  getUploadedExerciseData() {
    return this.uploadedExercise.value;
  }

  getUploadedManual() {
    return this.uploadedManual.value;
  }


  subscribeToUploadedManualFile(callback: () => void) {
    this.uploadedManual.subscribe(() => {
      callback();
    });
  }

  subscribeToUploadedExerciseFile(callback: () => void) {
    this.uploadedExercise.subscribe(() => {
      callback();
    });
  }
}
