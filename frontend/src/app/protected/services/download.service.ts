import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {
  }

  downloadFile(docId: number): void {
    this.http.get<Blob>(`api/download/${docId}`, {
      observe: 'response',
      responseType: 'blob' as 'json',
    }).subscribe(resp => this.downloadBlob(resp));
  }

  downloadBlob(resp: any) { //TODO: type is actually resp: HttpResponse<Blob>
    const element = document.createElement('a');
    console.log(resp.headers)
    // @ts-ignore
    const blob = new Blob([resp.body], {
      type: resp.headers.get('content-type'),
    });
    element.href = window.URL.createObjectURL(blob);
    element.download = DownloadService.getFileName(
      // @ts-ignore
      resp.headers.get('content-disposition')
    );
    document.body.appendChild(element);
    element.click();
  }

  private static getFileName(str: string) {
    const matches = str.match(/"(.*?)"/);
    return matches ? matches[1] : str;
  }
}
