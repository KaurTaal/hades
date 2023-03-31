import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Manual} from "../classes/Manual";

@Injectable({
  providedIn: 'root'
})
export class ManualService {

  constructor(private http: HttpClient) { }


  getAllManuals(): Observable<Manual[]> {
    return this.http.get<Manual[]>("api/manual/getAllManuals");
  }

  createManual(file: FormData): Observable<Manual> {
    return this.http.post<Manual>("api/manual/createManual", file);
  }

  deleteManualById(manualId: number) {
    return this.http.delete(`api/manual/deleteManual/${manualId}`);
  }

}
