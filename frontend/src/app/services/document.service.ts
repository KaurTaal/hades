import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {

  }

  saveEditedFile(fileId: number, file: FormData) {
    return this.http.put(`api/saveEditedFile/${fileId}`, file);
  }

  getNewDocx(newContent: string): Observable<HttpResponse<Blob>> {
    return this.http.post<Blob>(`api/getNewDocx`, newContent, {
      observe: 'response',
      responseType: 'blob' as 'json'
    })
  }

}
