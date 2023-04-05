import {Component, Input, OnInit} from '@angular/core';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {FileUploadModalComponent} from "../../modals/file-upload-modal/file-upload-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {LabelService} from "../../services/label.service";
import {Label} from "../../classes/Label";
import {BaseDocument} from "../../classes/BaseDocument";
import {SharedDataService} from "../../services/shared-data.service";
import {Exercise} from "../../classes/Exercise";
import {intersection} from "lodash";
import {CourseService} from "../../services/course.service";


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
  filterCourseSelect?: boolean;
  @Input()
  filterLabelSelect?: boolean;

  documentDisplayList: BaseDocument[] = [];
  filteredDocumentLabelList: BaseDocument[] = [];
  filteredDocumentNameSearchList: BaseDocument[] = [];
  filteredDocumentYearList: BaseDocument[] = [];
  filteredDocumentCourseList: BaseDocument[] = [];

  nameList: string[] = [];
  labelList: Label[] = [];
  yearList: number[] = [];
  courseList: string[] = [];

  selectedNameSearch: string = '';
  selectedLabels: Label[] = [];
  selectedYear: number = 0;
  selectedCourseName: string = "";


  dropdownSettings = {
    singleSelection: false,
    idField: 'labelId',
    textField: 'labelName',
    selectAllText: 'Vali kõik',
    unSelectAllText: 'Tühjenda',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    noDataAvailablePlaceholderText: "Märksõnad on lisamata"
  };


  constructor(private modalService: BsModalService,
              private labelService: LabelService,
              private courseService: CourseService,
              private sharedDataService: SharedDataService) {

  }

  ngOnInit() {
    this.sharedDataService.getDocumentDisplayList().subscribe(documents => {
      this.documentDisplayList = documents
      this.initDocumentNameList();
      this.initLabelSelect();
      this.initYearSelect();
      this.initCourseSelect();
    });
  }



  applyFilter() {
    if (!this.isEmptyFilters()) {
      this.filterDocumentsByTextSearch();
      this.filterDocumentsByLabel();
      this.filterDocumentsByYear();
      this.filterDocumentsByCourse();

      this.sharedDataService.updateDocumentDisplayList(this.getCommonDocuments());
      this.resetFilteredLists();
    } else {
      this.emptyFilter();
    }
  }

  emptyFilter() {
    this.selectedNameSearch = "";
    this.selectedLabels = [];
    this.selectedYear = 0;
    this.selectedCourseName = "";

    this.sharedDataService.updateDocumentDisplayList(this.documentDisplayList);
    this.resetFilteredLists();
  }

  private initDocumentNameList() {
    this.nameList = this.documentDisplayList.filter(document => document && document.name).map(document => document.name);
  }

  private initLabelSelect() {
    this.labelService.getAllLabels().subscribe(res => {
      this.labelList = res;
    });
  }

  private initYearSelect() {
    this.yearList = Array.from(new Set(this.documentDisplayList.map(document => document.year)));
  }

  private initCourseSelect() {
    this.courseList = Array.from(new Set(this.documentDisplayList.map((document) => document.courseDTO.courseName)));
  }

  private filterDocumentsByTextSearch() {
    if (this.selectedNameSearch !== '') {
      this.filteredDocumentNameSearchList = this.documentDisplayList.filter(document => document.name === this.selectedNameSearch);
    }
  }

  private filterDocumentsByLabel() {
    if (this.selectedLabels.length > 0) {
      const documentsAsExercises = [... this.documentDisplayList as Exercise[]];
      this.filteredDocumentLabelList = documentsAsExercises.filter(document => this.containsLabel(document.labelDTOList));
    }
  }

  private filterDocumentsByYear() {
    if (this.selectedYear > 0) {
      this.filteredDocumentYearList = this.documentDisplayList.filter(doc => doc.year === this.selectedYear);
    }
  }

  private filterDocumentsByCourse() {
    if (this.selectedCourseName !== "") {
      this.filteredDocumentCourseList = this.documentDisplayList.filter(doc => doc.courseDTO.courseName === this.selectedCourseName);
    }
  }

  private containsLabel(documentLabels: Label[]): boolean {
    for (let documentLabel of documentLabels) {
      if (this.selectedLabels.find(selectedLabel => selectedLabel.labelId === documentLabel.labelId)) {
        return true;
      }
    }
    return false;
  }

  private isEmptyFilters(): boolean {
    const noLabelSelected: boolean = this.selectedLabels.length === 0;
    const noNameSearch: boolean = this.selectedNameSearch === '';
    const noYearSelect: boolean = this.selectedYear === 0 || this.selectedYear === null;
    const noCourseSelect: boolean = this.selectedCourseName === "";

    return noLabelSelected && noNameSearch && noYearSelect && noCourseSelect;
  }

  private getCommonDocuments(): BaseDocument[] {
    const filteredLists = [this.filteredDocumentLabelList, this.filteredDocumentNameSearchList, this.filteredDocumentYearList, this.filteredDocumentCourseList];
    const nonEmptyLists = filteredLists.filter(list => list.length > 0);
    if (nonEmptyLists.length > 0) {
      return intersection(...nonEmptyLists);
    }
    return [];
  }

  private resetFilteredLists() {
    this.filteredDocumentNameSearchList = [];
    this.filteredDocumentLabelList = [];
    this.filteredDocumentYearList = [];
    this.filteredDocumentCourseList = [];
  }

  openFileUploadModal() {
    this.modalService.show(FileUploadModalComponent);
  }

}
