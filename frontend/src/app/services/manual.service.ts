import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManualService {

  constructor(private http: HttpClient) {

  }

  getManualsList(): Observable<any> {
    return this.http.get("/api/getManualsList")
  }

  createManual(file: FormData): Observable<any> {
    return this.http.post("/api/createManual", file);
  }
}
