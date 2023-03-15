import { Component } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent {
  constructor(public bsModalRef: BsModalRef) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

  }


}
