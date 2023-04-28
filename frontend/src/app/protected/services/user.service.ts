import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../classes/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("api/users/getAllUsers");
  }

  activateUser(userId: number): Observable<User> {
    return this.http.put<User>(`api/users/activateUser/${userId}`, null);
  }

  deactivateUser(userId: number): Observable<User> {
    return this.http.put<User>(`api/users/deactivateUser/${userId}`, null);
  }

  changeToAdmin(userId: number): Observable<User> {
    return this.http.put<User>(`api/users/changeToAdmin/${userId}`, null);
  }

  changeToUser(userId: number): Observable<User> {
    return this.http.put<User>(`api/users/changeToUser/${userId}`, null);
  }

  deleteUserById(userId: number) {
    return this.http.delete(`api/users/deleteById/${userId}`);
  }
}
