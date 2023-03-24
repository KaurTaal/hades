import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, clazz: new (obj: any) => T): Observable<T[]> {
    return this.http.get<any>(url).pipe(
      map(response => response.object.map((obj: any) => new clazz(obj)))
    );
  }

  post<T>(url: string, file: FormData, clazz: new (obj: any) => T): Observable<T> {
    return this.http.post<any>(url, file).pipe(
      map(response => new clazz(response.object))
    );
  }

}
