import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../classes/Exercise";
import {TestSuite} from "../classes/TestSuite";
import {Solution} from "../classes/Solution";

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

  createNewTestSuite(file: FormData, parentId: number): Observable<TestSuite> {
    return this.http.post<TestSuite>(`api/exercise/createTestSuite/${parentId}`, file);
  }

  deleteTestSuiteById(testSuiteId: number) {
    return this.http.delete(`api/exercise/deleteTestSuite/${testSuiteId}`);
  }

  createNewSolution(file: FormData, parentId: number): Observable<Solution> {
    return this.http.post<Solution>(`api/exercise/createSolution/${parentId}`, file);
  }

  deleteSolutionById(solutionId: number) {
    return this.http.delete(`api/exercise/deleteSolution/${solutionId}`);
  }

}
