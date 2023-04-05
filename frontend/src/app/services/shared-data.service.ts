import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Exercise} from "../classes/Exercise";
import {Manual} from "../classes/Manual";
import {BaseDocument} from "../classes/BaseDocument";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private uploadedExercise: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private uploadedManual: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private documentDisplayList: Subject<BaseDocument[]> = new Subject<BaseDocument[]>();
  private filteredDocumentList: BehaviorSubject<BaseDocument[]> = new BehaviorSubject<BaseDocument[]>([]);


  updateDocumentDisplayListForToolbar(documents: BaseDocument[]) {
    this.documentDisplayList.next(documents);
  }

  updateDocumentDisplayList(documents: BaseDocument[]) {
    this.filteredDocumentList.next(documents);
  }

  getDocumentDisplayList(): Observable<BaseDocument[]> {
    return this.documentDisplayList.asObservable();
  }

  getFilteredDocumentList(): Observable<BaseDocument[]> {
    return this.filteredDocumentList.asObservable();
  }


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
