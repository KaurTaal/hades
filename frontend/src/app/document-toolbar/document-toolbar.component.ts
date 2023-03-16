import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {FileUploadModalComponent} from "../modals/file-upload-modal/file-upload-modal.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";


@Component({
  selector: 'app-document-toolbar',
  templateUrl: './document-toolbar.component.html',
  styleUrls: ['./document-toolbar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
})
export class DocumentToolbarComponent implements OnInit{
  @Input()
  filterYearSelect?: boolean;
  @Input()
  filterTextSearch?: boolean;
  @Input()
  filterWeekSelect?: boolean;
  @Input()
  filterLabelSelect?: boolean;

  dropdownList: any[] = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

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

  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  openFileUploadModal() {
    const modalRef = this.modalService.show(FileUploadModalComponent);
  }
}
