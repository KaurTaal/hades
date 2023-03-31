import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {FileUploadModalComponent} from "../../modals/file-upload-modal/file-upload-modal.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BsModalService} from "ngx-bootstrap/modal";
import {LabelService} from "../../services/label.service";
import {Label} from "../../classes/Label";
import {BaseDocument} from "../../classes/BaseDocument";
import {SharedDataService} from "../../services/shared-data.service";
import {document} from "ngx-bootstrap/utils";


@Component({
  selector: 'hades-document-toolbar',
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
  documentDisplayList: BaseDocument[] = [];

  labelList: Label[] = [];
  selectedLabels: any = [];
  dropdownSettings: any = {};
  textSearchValue: string = '';
  documentNameList: string[] = [];
  filteredDocumentList: BaseDocument[] = [];

  constructor(private modalService: BsModalService,
              private labelService: LabelService,
              private sharedDataService: SharedDataService) {

  }

  ngOnInit() {

    this.sharedDataService.getDocumentDisplayList().subscribe(documents => {
      this.documentDisplayList = documents
      this.initDocumentNameList();
    });

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
      textField: 'labelName',
      selectAllText: 'Vali kõik',
      unSelectAllText: 'Tühjenda',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  initDocumentNameList() {
    this.documentNameList = this.documentDisplayList.filter(document => document && document.name).map(document => document.name as string);
  }

  applyFilter() {
    this.filterDocumentsByTextSearch();


    if (this.filteredDocumentList.length > 0) {
      this.sharedDataService.updateFilteredDocumentList(this.filteredDocumentList);
    }
  }

  emptyFilter() {
    this.textSearchValue = "";

    this.sharedDataService.updateFilteredDocumentList(this.documentDisplayList);
  }

  filterDocumentsByTextSearch() {
    this.filteredDocumentList = this.documentDisplayList.filter(document => document.name === this.textSearchValue);
  }

  openFileUploadModal() {
    this.modalService.show(FileUploadModalComponent);
  }

}
