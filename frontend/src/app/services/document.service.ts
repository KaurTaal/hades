import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Manual} from "../classes/Manual";
import {HttpClient} from "@angular/common/http";
import {Exercise} from "../classes/Exercise";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {

  }

  getAllManuals(): Observable<Manual[]> {
    return this.http.get<Manual[]>("api/getAllManuals");
  }

  createManual(file: FormData): Observable<Manual> {
    return this.http.post<Manual>("api/createManual", file);
  }

  deleteManualById(manualId: number) {
    return this.http.delete(`api/deleteManual/${manualId}`);
  }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>("api/getAllExercises");
  }

  createExercise(file: FormData): Observable<Exercise> {
    return this.http.post<Exercise>("api/createExercise", file);
  }

}
