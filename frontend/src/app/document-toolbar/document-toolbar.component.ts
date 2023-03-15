import {Component, Input} from '@angular/core';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {FileUploadModalComponent} from "../modals/file-upload-modal/file-upload-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";


@Component({
  selector: 'app-document-toolbar',
  templateUrl: './document-toolbar.component.html',
  styleUrls: ['./document-toolbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
})
export class DocumentToolbarComponent {
  @Input()
  filterYearSelect?: boolean;
  @Input()
  filterTextSearch?: boolean;
  @Input()
  filterWeekSelect?: boolean;
  @Input()
  filterTypeTab?: boolean;

  selected?: string;
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia'
  ];

  constructor(private modalService: BsModalService) {

  }


  openFileUploadModal() {
    const modalRef = this.modalService.show(FileUploadModalComponent);
  }
}
