import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {BaseService} from "./base.service";
import {ManualDoc} from "../classes/ManualDoc";
import {Label} from "../classes/Label";

@Injectable({
  providedIn: 'root'
})
export class ManualService {

  CREATE_MANUAL: string = "/api/createManual";
  GET_ALL_MANUALS: string = "/api/getAllManuals"

  constructor(private baseService: BaseService) {

  }

  getAllManuals(): Observable<any> {
    return this.baseService.get<ManualDoc>(this.GET_ALL_MANUALS, ManualDoc)
  }

  createManual(file: FormData): Observable<any> {
    return this.baseService.post<ManualDoc>(this.CREATE_MANUAL, file, ManualDoc);
  }
}
