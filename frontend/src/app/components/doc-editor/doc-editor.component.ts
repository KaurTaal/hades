import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {DocumentService} from "../../services/document.service";
import {environment} from "../../../environments/environment";
import {BaseDocument} from "../../classes/BaseDocument";
import {DocumentType} from "../../classes/enums/DocumentType";
import {Exercise} from "../../classes/Exercise";
import {BsModalService} from "ngx-bootstrap/modal";
import {AddFileUploadComponent} from "../../modals/add-file-upload/add-file-upload.component";
import {SharedDataService} from "../../services/shared-data.service";
import {ExerciseService} from "../../services/exercise.service";
import {AlertBroker} from "../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {AlertType} from "../../alert/alert.model";

@Component({
  selector: 'hades-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss']
})
export class DocEditorComponent implements OnInit {
  @ViewChildren("nameInput")
  nameInputs!: QueryList<ElementRef>;

  @Output()
  deletedDocument = new EventEmitter<BaseDocument>();
  @Output()
  modifiedDocument = new EventEmitter<BaseDocument>();

  @Input()
  document!: BaseDocument;
  documentAsExercise!: Exercise;
  activeEditorTab!: DocumentType;
  isExerciseDocument: boolean = false;
  isNameEditActive: boolean = false;

  isTestSuiteTabActive: boolean = false;
  isSolutionTabActive: boolean = false;
  isMainTabActive: boolean = false;

  readonly mainTabEditorConfig = {
    plugins: 'code link image table codesample autoresize',
    toolbar: 'undo redo | bold italic underline | link table | forecolor backcolor | codesample | code',
    branding: false,
    menu: {
      file: {
        title: 'File',
        items: 'print'
      }
    },
    code_dialog: true,
    codesample_languages: [
      {text: 'Python', value: 'python'},
      {text: 'Java', value: 'java'},
    ],
  };

  readonly solutionAndTestSuiteEditorConfig = {
    plugins: 'codesample code autoresize',
    toolbar: 'undo redo | codesample | code',
    branding: false,
    menu: {
      file: {
        title: 'File',
        items: 'print'
      }
    },
    code_dialog: true,
    codesample_languages: [
      {text: 'Python', value: 'python'},
      {text: 'Java', value: 'java'},
    ],
  }

  constructor(private documentService: DocumentService,
              private downloadService: DownloadService,
              private modalService: BsModalService,
              private exerciseService: ExerciseService,
              private alertBroker: AlertBroker,
              private sharedDataService: SharedDataService,) {
  }


  ngOnInit() {
    this.setMainTabActive();
    this.isExerciseDocument = DocumentType.EXERCISE === this.document.docType;
    this.activeEditorTab = this.document.docType;
    if (this.isExerciseDocument) {
      this.documentAsExercise = this.document as Exercise;
    }
  }

  handleAddNewSubDocument() {
    if (this.isSolutionTabActive) {
      this.addNewSolution();
    }
    if (this.isTestSuiteTabActive) {
      this.addNewTestSuite();
    }
  }

  addNewTestSuite() {
    const initialState = {
      parentExerciseId: this.documentAsExercise.exerciseId,
      isTestSuiteUpload: true,
    }
    let bsModalRef = this.modalService.show(AddFileUploadComponent, {initialState});

    bsModalRef.onHide?.subscribe(() => {
      this.sharedDataService.getAddedTestSuite().subscribe((addedTestSuite) => {
        if (addedTestSuite) {
          this.documentAsExercise.testSuiteDTOList.push(addedTestSuite);
          this.sharedDataService.setAddedTestSuite(null);
        }
      })
    })
  }

  addNewSolution() {
    const initialState = {
      parentExerciseId: this.documentAsExercise.exerciseId,
      isSolutionUpload: true,
    }
    let bsModalRef = this.modalService.show(AddFileUploadComponent, {initialState});
    bsModalRef.onHide?.subscribe(() => {
      this.sharedDataService.getAddedSolution().subscribe((addedSolution) => {
        if (addedSolution) {
          this.documentAsExercise.solutionDTOList.push(addedSolution);
          this.sharedDataService.setAddedTestSuite(null);
        }
      })
    })
  }

  deleteTestSuite(testSuiteId: number) {
    this.exerciseService.deleteTestSuiteById(testSuiteId).subscribe(() => {
      this.documentAsExercise.testSuiteDTOList = this.documentAsExercise.testSuiteDTOList.filter(testSuite => testSuite.testSuiteId !== testSuiteId);
      this.alertBroker.add(SuccessResponse.TEST_SUITE_DELETE_SUCCESS, AlertType.SUCCESS);
    });
  }

  deleteSolution(solutionId: number) {
    this.exerciseService.deleteSolutionById(solutionId).subscribe(() => {
      this.documentAsExercise.solutionDTOList = this.documentAsExercise.solutionDTOList.filter(solution => solution.solutionId !== solutionId);
      this.alertBroker.add(SuccessResponse.SOLUTION_DELETE_SUCCESS, AlertType.SUCCESS);
    })
  }

  saveDocument() {
    this.modifiedDocument.emit(this.document);
  }

  deleteDocument() {
    this.deletedDocument.emit(this.document);
  }

  downloadDocument() {
    if ((DocumentType.EXERCISE === this.activeEditorTab || DocumentType.MANUAL === this.activeEditorTab) && this.document.fileId) {
      this.downloadService.downloadFile(this.document.fileId);
    }
    if (DocumentType.SOLUTION === this.activeEditorTab) {
      if (this.documentAsExercise.solutionDTOList) {
        this.documentAsExercise.solutionDTOList.forEach(solution => this.downloadService.downloadFile(solution.fileId));
      }
    }
    if (DocumentType.TEST_SUITE === this.activeEditorTab) {
      if (this.documentAsExercise.testSuiteDTOList) {
        this.documentAsExercise.testSuiteDTOList.forEach(testSuite => this.downloadService.downloadFile(testSuite.fileId));
      }
    }
  }

  toggleSolutionTab() {
    this.setSolutionTabActive();
    this.activeEditorTab = DocumentType.SOLUTION;
  }

  toggleExerciseTab() {
    this.setMainTabActive();
    this.activeEditorTab = this.document.docType;
  }

  toggleTestSuiteTab() {
    this.setTestSuiteTabActiveTrue();
    this.activeEditorTab = DocumentType.TEST_SUITE;
    this.isTestSuiteTabActive = true;
  }

  getEditorAPIKey(): string {
    return environment.EDITOR_API_KEY;
  }


  editSubDocumentName(event: any, index: number) {

    this.isNameEditActive = false;
    const nameInput = this.nameInputs.toArray()[index].nativeElement as HTMLInputElement;
    setTimeout(() => nameInput.focus());

    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    const nameInputs = this.nameInputs.toArray();
    for (const element of nameInputs) {
      const nameInput = element.nativeElement as HTMLInputElement;
      if (!nameInput.contains(event.target as Node)) {
        this.isNameEditActive = false;
        nameInput.blur();
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  }


  private setTestSuiteTabActiveTrue() {
    this.isTestSuiteTabActive = true;
    this.isMainTabActive = false;
    this.isSolutionTabActive = false;
  }

  private setMainTabActive() {
    this.isMainTabActive = true;
    this.isSolutionTabActive = false;
    this.isTestSuiteTabActive = false;
  }

  private setSolutionTabActive() {
    this.isSolutionTabActive = true;
    this.isMainTabActive = false;
    this.isTestSuiteTabActive = false;
  }
}
