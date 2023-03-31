import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../classes/Exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {

  }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>("api/exercise/getAllExercises");
  }

  createExercise(file: FormData): Observable<Exercise> {
    return this.http.post<Exercise>("api/exercise/createExercise", file);
  }

  deleteExerciseById(exerciseId: number) {
    return this.http.delete(`api/exercise/deleteExercise/${exerciseId}`);
  }

}
