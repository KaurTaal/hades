import { Component } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ManualService} from "../../services/manual.service";

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent {
  constructor(public bsModalRef: BsModalRef, private manualService: ManualService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.manualService.createManual(formData).subscribe(res => console.log(res));
  }


}
