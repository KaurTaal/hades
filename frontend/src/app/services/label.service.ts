import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Label} from "../classes/Label";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  GET_ALL_LABELS: string = "/api/getAllLabels";

  constructor(private baseService: BaseService) {
  }

  getAllLabels(): Observable<Label[]> {
    return this.baseService.get<Label>(this.GET_ALL_LABELS, Label);
  }
}
