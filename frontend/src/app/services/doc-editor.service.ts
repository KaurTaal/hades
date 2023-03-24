import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {ManualDoc} from "../classes/ManualDoc";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocEditorService {

  constructor(private http: HttpClient) {

  }

  deleteManualById(manualId: number): Observable<any> {
    return this.http.delete(`api/deleteManual/${manualId}`);
  }
}
