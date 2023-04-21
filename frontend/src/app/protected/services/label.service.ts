import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Label} from "../classes/Label";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  GET_ALL_LABELS: string = "/api/getAllLabels";

  constructor(private http: HttpClient) {
  }

  getAllLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.GET_ALL_LABELS);
  }
}
