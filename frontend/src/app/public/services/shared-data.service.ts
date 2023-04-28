import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private isNotRegisteredUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private isNotActiveUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  setIsNotActiveUser(value: boolean) {
    this.isNotActiveUser.next(value);
  }

  getIsNotActiveUser(): boolean {
    return this.isNotActiveUser.value;
  }

  setIsNotRegisteredUser(value: boolean) {
    this.isNotRegisteredUser.next(value);
  }

  getIsNotRegisteredUser(): boolean {
    return this.isNotRegisteredUser.value;
  }
}
