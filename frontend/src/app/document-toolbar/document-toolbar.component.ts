import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {FileUploadModalComponent} from "../modals/file-upload-modal/file-upload-modal.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
import {LabelService} from "../services/label.service";
import {Label} from "../classes/Label";


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

  labelList: Label[] = [];
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
              private labelService: LabelService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    /*
    { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
     */

    this.labelService.getAllLabels().subscribe(res => {
      this.labelList = res;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'labelId',
      textField: 'name',
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
