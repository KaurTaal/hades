import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private uploadedDoc: any = new BehaviorSubject<any>(null);

  constructor() { }


  setUploadedDoc(data: any) {
    this.uploadedDoc.next(data);
  }

  getUploadedFileData() {
    return this.uploadedDoc.value;
  }

  subscribeToUploadedFileData(callback: () => void) {
    this.uploadedDoc.subscribe(() => {
      callback();
    });
  }
}
